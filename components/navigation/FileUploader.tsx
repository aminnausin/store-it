import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function FileUploader() {
    return (
        <Button className="uploader-button">
            <Image src="/assets/icons/upload.svg" alt="upload" width={24} height={24} className="" />
            Upload
        </Button>
    );
}
