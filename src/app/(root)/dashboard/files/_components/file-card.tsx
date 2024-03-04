"use client";

import Image from "next/image";
import { Protect } from "@clerk/nextjs";
import { Doc } from "../../../../../../convex/_generated/dataModel";

import { ImageIcon, FileTextIcon, GanttChartIcon } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { DeleteButton } from "./delete-button";
import { getFileUrl } from "@/lib/get-file-url";
import { FavoriteButton } from "./favorite-button";
import { DownloadButton } from "./download-button";

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
                <FavoriteButton file={file} isFavorited={isFavorited} />
                <DownloadButton file={file} />
                <Protect role="org:admin" fallback={<></>}>
                    <DeleteButton fileId={file._id} />
                </Protect>
            </CardFooter>
        </Card>
    )
}