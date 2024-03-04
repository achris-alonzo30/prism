"use client";

import Image from "next/image";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";

import { ImageIcon, FileTextIcon, GanttChartIcon } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { FileDelete } from "./file-delete";
import { Button } from "@/components/ui/button";
import { getFileUrl } from "@/lib/get-file-url";
import { FileFavorite } from "./file-favorite";
import { Protect } from "@clerk/nextjs";

const typeIcons = {
    image: <ImageIcon className="h-5 w-5" />,
    pdf: <FileTextIcon className="h-5 w-5" />,
    csv: <GanttChartIcon className="h-5 w-5" />
} as Record<Doc<"files">["fileType"], React.ReactNode>;

type FileCardProps = {
    file: Doc<"files">;
    favorites: Doc<"favorites">[];
}

export const FileCard = ({ file, favorites }: FileCardProps) => {

    const isFavorited = favorites.some((favorite) => favorite.fileId === file._id)

    return (
        <Card>
            <CardHeader>
                {/* TODO: Redesign this part */}
                <CardTitle className="flex items-center gap-x-2">
                    {typeIcons[file.fileType]}
                    <p className="text-base font-bold">{file.name}</p>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center  w-auto" >
                {file.fileType === "image" && (
                    <Image src={getFileUrl(file.fileId)} alt="File preview" width={300} height={300} className="object-cover aspect-square" />
                )}
                {/* TODO: Find a way to snapshot the pdf and csv to display the preview */}
            </CardContent>
            <CardFooter className="flex items-center justify-center w-full gap-x-1 p-2 ">
                <FileFavorite file={file} isFavorited={isFavorited} />
                <Button size="sm" className="flex w-full items-center text-center text-sm gap-x-2 text-white bg-primary-color/80 hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400" onClick={() => { window.open(getFileUrl(file.fileId), "_blank") }} >Download</Button>
                <Protect role="org:admin" fallback={<></>}>
                    <FileDelete fileId={file._id} />
                </Protect>
            </CardFooter>
        </Card>
    )
}