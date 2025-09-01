"use server";

import { createAdminClient, createSessionClient } from "../appwrite";
import { handleError, parseStringify } from "../utils";
import { avatarPlaceholderUrl } from "@/constants";
import { appwriteConfig } from "../appwrite/config";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();

    const result = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal("email", [email])]);

    return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailToken(ID.unique(), email);
        return session.userId;
    } catch (error) {
        handleError(error, "Failed to send email OTP");
    }
};

export const verifySecret = async ({ accountId, otp }: { accountId: string; otp: string }) => {
    try {
        const { account } = await createAdminClient();

        const session = await account.createSession(accountId, otp);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify({ sessionId: session.$id });
    } catch (error) {
        handleError(error, "Failed to verify OTP");
    }
};

export const getCurrentUser = async () => {
    try {
        const { databases, account } = await createSessionClient();

        const result = await account.get();
        const user = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal("accountId", result.$id)]);

        if (user.total <= 0) return null;
        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log(error);

        return null;
    }
};

export const createAccount = async ({ fullName, email }: { fullName: string; email: string }) => {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({ email });

    if (!accountId) throw new Error("Failed to send an OTP");

    if (!existingUser) {
        const { databases } = await createAdminClient();
        await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(), {
            fullName,
            email,
            avatar: avatarPlaceholderUrl,
            accountId,
        });
    }

    return parseStringify({ accountId });
};

export const createSession = async ({ email }: { email: string }) => {
    try {
        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return parseStringify({ accountId: null, error: "Account does not exist" });
        }
        await sendEmailOTP({ email });
        return parseStringify({ accountId: existingUser.accountId });
    } catch (error) {
        handleError(error, "Failed to create user sesion");
    }
};

export const destroySession = async () => {
    const { account } = await createSessionClient();

    try {
        await account.deleteSession("current");

        (await cookies()).delete("appwrite-session");

        redirect("/sign-in");
    } catch (error) {
        console.log("Error logging out");
        throw error;
    }
};

export const renameFile = async ({ fileId, name, extension, path }: RenameFileProps) => {
    const { databases } = await createAdminClient();

    try {
        const newName = `${name}.${extension}`;
        const updatedFile = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, fileId, { name: newName });

        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error) {
        handleError(error, "Failed to rename file");
    }
};

export const deleteFile = async ({ fileId, bucketFileId, path }: DeleteFileProps) => {
    const { databases, storage } = await createAdminClient();

    try {
        const deletedFile = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, fileId);

        if (deletedFile) {
            await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
        }

        revalidatePath(path);
        return parseStringify({ status: "success" });
    } catch (error) {
        handleError(error, "Failed to rename file");
    }
};

export const updateFileUsers = async ({ fileId, emails, path }: UpdateFileUsersProps) => {
    const { databases } = await createAdminClient();

    try {
        if (emails.includes((await getCurrentUser()).email)) {
            throw new Error("You cannot share a file with yourself");
        }

        const updatedFile = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.filesCollectionId, fileId, { users: emails });

        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error) {
        handleError(error, "Failed to share file");
    }
};
