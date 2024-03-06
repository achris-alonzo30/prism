"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { formatRelative } from "date-fns";
import { getFileUrl } from "@/lib/get-file-url";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { ImageIcon, FileTextIcon, GanttChartIcon } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { ActionTooltip } from "@/components/action-tooltip";
import { ActionCard } from "../files/_components/action-card";


const typeIcons = {
    image: <ImageIcon className="h-5 w-5" />,
    pdf: <FileTextIcon className="h-5 w-5" />,
    csv: <GanttChartIcon className="h-5 w-5" />
} as Record<Doc<"files">["fileType"], React.ReactNode>;

export const FileCard = ({
    file,
}: { 
    file: Doc<"files"> & { isFavorited: boolean}; 
}) => {
    const getImageUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId});
    const userProfile = useQuery(api.users.getUserProfile, { userId: file.userId });
    
    return (
        <Card className="shadow-md dark:shadow-gray-600 transform hover:-translate-y-1 transition-all duration-400">
            <CardHeader>
                {/* TODO: Redesign this part */}
                <CardTitle className="flex items-center justify-between">
                    <ActionTooltip title={userProfile?.name ?? ""}>
                        <Image src={userProfile?.profileImage!} alt="profile image" width={30} height={30} className="object-cover aspect-square rounded-full" />
                    </ActionTooltip>
                    <ActionCard file={file} isFavorited={file.isFavorited} />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center w-auto" >
                {file.fileType === "image" && (
                    <Image src={getImageUrl ?? ""} alt="File preview" width={300} height={300} className="object-cover aspect-square rounded-md" />
                )}
                {/* TODO: Find a way to snapshot the pdf and csv to display the preview */}
                {file.fileType === "pdf" && (
                    <FileTextIcon className="w-24 h-24 text-center justify-center my-12" />
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 p-2 pt-auto">
                <div className="flex items-center gap-x-2">
                    {typeIcons[file.fileType]}
                    <p className="text-base font-bold truncate">{file.name}</p>
                </div>
                <p className="text-xs text-hover-primary-color font-semibold capitalize">Uploaded <strong className="font-semibold">{formatRelative(new Date(file._creationTime), new Date())}</strong></p>
            </CardFooter>
        </Card>
    )
}