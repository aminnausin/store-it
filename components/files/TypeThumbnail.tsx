import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SimpleThumbnail({ type, imageClassName = "", className = "" }: { type: string; imageClassName?: string; className?: string }) {
    const getThumbnail = () => {
        switch (type) {
            case "document":
                return { thumbnail: "/assets/icons/documents.svg", color: "bg-green shadow-green" };
            case "image":
                return { thumbnail: "/assets/icons/images.svg", color: "bg-blue shadow-blue pe-0.5" };
            case "video":
            case "audio":
                return { thumbnail: "/assets/icons/video.svg", color: "bg-red shadow-red" };
            default:
                return { thumbnail: "/assets/icons/others.svg", color: "bg-pink shadow-pink" };
        }
    };

    const { thumbnail, color } = getThumbnail();

    return (
        <figure className={cn("flex-center size-12 overflow-hidden rounded-full shadow-sm", color, className)}>
            <Image src={thumbnail} alt="thumbnail" width={128} height={128} className={cn("size-6 object-contain", imageClassName)} />
        </figure>
    );
}
