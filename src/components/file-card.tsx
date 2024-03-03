"use client";

import { Doc } from "../../convex/_generated/dataModel";

import { Upload } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { FileDelete } from "./file-delete";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "./action-tooltip";


export const FileCard = ({ file }: { file: Doc<"files"> }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{file.name}</CardTitle>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex items-center justify-center w-full gap-x-2 p-2 ">
                <ActionTooltip title={"Download"}>
                    <Button size="sm" className="flex w-full items-center text-center text-sm gap-x-2 text-white bg-primary-color/80 hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400" ><Upload className="h-4 w-4" /></Button>
                </ActionTooltip>
                <FileDelete fileId={file._id} />

            </CardFooter>
        </Card>
    )
}