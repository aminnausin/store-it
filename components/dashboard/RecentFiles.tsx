import { getFiles } from "@/lib/actions/file.actions";
import RecentFile from "./RecentFile";
import { Models } from "node-appwrite";

export default async function RecentFiles() {
    const files = await getFiles({ types: [], limit: 10 });

    return (
        <section className="dashboard-recent-files">
            <h2 className="h2 text-light-100">Recently uploaded</h2>
            {files.documents.length > 0 ? (
                <ul className="mt-5 flex flex-col gap-5">
                    {files.documents?.map((file: Models.Document) => {
                        return <RecentFile key={file.$id} file={file} />;
                    })}
                </ul>
            ) : (
                <p className="empty-list">No files uploaded</p>
            )}
        </section>
    );
}
