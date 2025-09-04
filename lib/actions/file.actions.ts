"use server";

import { constructFileUrl, getFileType, handleError, parseStringify } from "../utils";
import { ID, Models, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { getCurrentUser } from "./user.actions";
import { revalidatePath } from "next/cache";
import { InputFile } from "node-appwrite/file";
import { TOTAL_STORAGE_SIZE } from "@/constants";

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileRequest) => {
    const { storage, databases } = await createAdminClient();

    try {
        const inputFile = InputFile.fromBuffer(file, file.name);

        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile);

        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId,
            users: [],
            bucketFileId: bucketFile.$id,
        };

        const newFile = await databases
            .createDocument(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, ID.unique(), fileDocument)
            .catch(async (error: unknown) => {
                await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
                throw new Error(`Failed to create file document: ${error}`);
            });

        revalidatePath(path);
        return parseStringify(newFile);
    } catch (error) {
        handleError(error, "Failed to upload file");
    }
};

export const getFiles = async ({ types, searchText = "", sort = "$createdAt-desc", limit }: GetFilesProps) => {
    const { databases } = await createAdminClient();

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            throw new Error("User not found");
        }

        const queries = createQueries(currentUser, types, searchText, sort, limit);

        const files = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, queries);

        return parseStringify(files);
    } catch (error) {
        handleError(error, "Failed to get files");
    }
};
function createQueries(currentUser: Models.Document, types: string[], searchText: string, sort: string, limit?: number) {
    const [sortBy, orderBy] = sort.split("-");

    const queries = [
        Query.or([Query.equal("owner", [currentUser.$id]), Query.contains("users", [currentUser.email])]),
        ...(types.length > 0 ? [Query.contains("type", types)] : []),
        ...(searchText ? [Query.contains("name", searchText)] : []),
        ...(limit ? [Query.limit(limit)] : []),
        orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    ];

    return queries;
}

export const getTotalSpaceUsed = async () => {
    try {
        const { databases } = await createSessionClient();
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            throw new Error("User not authenticated");
        }

        const files = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, [Query.equal("owner", [currentUser.$id])]);

        const totalSpace = {
            image: { size: 0, latestDate: "" },
            document: { size: 0, latestDate: "" },
            video: { size: 0, latestDate: "" },
            audio: { size: 0, latestDate: "" },
            other: { size: 0, latestDate: "" },
            used: 0,
            all: TOTAL_STORAGE_SIZE /* Magic Number haha */,
        };

        files.documents.forEach((file) => {
            const fileType = file.type as FileType;
            totalSpace[fileType].size += file.size;
            totalSpace.used += file.size;

            if (!totalSpace[fileType].latestDate || new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)) {
                totalSpace[fileType].latestDate = file.$updatedAt;
            }
        });

        return parseStringify(totalSpace);
    } catch (error) {
        handleError(error, "Failed to get usage");
    }
};
