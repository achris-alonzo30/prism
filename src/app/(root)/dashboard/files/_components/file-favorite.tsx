"use client";

import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../convex/_generated/dataModel";



export const FileFavorite = ({ file }: { file: Doc<"files"> }) => {
    const toggleFavorite = useMutation(api.files.toggleFavorite);

    
    return (
        <Button size="sm" className="flex w-full items-center text-center text-sm gap-x-2 text-white bg-indigo-600 hover:bg-indigo-600/90 transform hover:-translate-y-1 transition-all duration-400" onClick={() => toggleFavorite({fileId: file._id})}>Favorite</Button>
    )
}