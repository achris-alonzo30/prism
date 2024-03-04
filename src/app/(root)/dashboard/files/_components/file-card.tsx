"use client";

import Image from "next/image";
import { Protect } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { formatRelative } from "date-fns";
import { api } from "../../../../../../convex/_generated/api";
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
import { ActionTooltip } from "@/components/action-tooltip";

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

    const userProfile = useQuery(api.users.getUserProfile, { userId: file.userId });

    const isFavorited = favorites.some((favorite) => favorite.fileId === file._id)

    return (
        <Card>
            <CardHeader>
                {/* TODO: Redesign this part */}
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        {typeIcons[file.fileType]}
                        <p className="text-base font-bold truncate">{file.name}</p>
                    </div>
                    <ActionTooltip title={userProfile?.name ?? ""}>
                        <Image src={userProfile?.profileImage!} alt="profile image" width={30} height={30} className="object-cover aspect-square rounded-full" />
                    </ActionTooltip>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center  w-auto" >
                {file.fileType === "image" && (
                    <Image src={getFileUrl(file.fileId)} alt="File preview" width={300} height={300} className="object-cover aspect-square rounded-md" />
                )}
                {/* TODO: Find a way to snapshot the pdf and csv to display the preview */}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 p-2">
                <p className="text-xs text-secondary-color font-normal">Uploaded on {formatRelative(new Date(file._creationTime), new Date())}</p>
                <div className="flex items-center justify-center w-full gap-x-1">
                {file.markedForDeletion ? (
                    <Protect role="org:admin" fallback={<></>}>
                        <DeleteButton file={file} />
                    </Protect>
                ) : (
                    <>
                        <FavoriteButton file={file} isFavorited={isFavorited} />
                        <DownloadButton file={file} />
                        <Protect role="org:admin" fallback={<></>}>
                            <DeleteButton file={file} />
                        </Protect>
                    </>
                )}
                </div>
            </CardFooter>
        </Card>
    )
}