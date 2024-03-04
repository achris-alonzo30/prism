"use client";

import { Button } from "@/components/ui/button"
import { getFileUrl } from "@/lib/get-file-url";
import { Doc } from "../../../../../../convex/_generated/dataModel";

export const DownloadButton = ({ file }: { file: Doc<"files">}) => {
    return (
        <Button size="sm" className="flex w-full items-center text-center text-sm gap-x-2 text-white bg-primary-color/80 hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400" onClick={() => { window.open(getFileUrl(file.fileId), "_blank") }} >Download</Button>
    )
}