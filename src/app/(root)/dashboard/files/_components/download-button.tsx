"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button"
import { getFileUrl } from "@/lib/get-file-url";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { ActionTooltip } from "@/components/action-tooltip";


export const DownloadButton = ({ file }: { file: Doc<"files"> }) => {
    return (
        <ActionTooltip title="Download">
            <Button
            size="sm"
            className="flex w-full items-center border text-center text-sm gap-x-2 text-zinc-500 hover:text-white bg-transparent hover:bg-primary-color/80 hover:border-primary-color/80  transform hover:-translate-y-1 transition-all duration-400"
            onClick={() => {
                window.open(getFileUrl(file.fileId), "_blank")
            }}
        >
            <Download className="h-4 w-4" />
        </Button>
        </ActionTooltip>
        
    )
}