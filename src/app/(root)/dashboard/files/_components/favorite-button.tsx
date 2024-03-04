"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { api } from "../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../convex/_generated/dataModel";

export const FavoriteButton = ({ file, isFavorited }: { file: Doc<"files">; isFavorited: boolean }) => {
    const router = useRouter();
    const { toast } = useToast();
    const toggleFavorite = useMutation(api.files.toggleFavorite);

    return (
        <Button
            size="sm"
            className="flex w-full items-center text-center text-sm gap-x-2 text-white bg-indigo-600 hover:bg-indigo-600/90 transform hover:-translate-y-1 transition-all duration-400"
            onClick={() => {
                toggleFavorite({ fileId: file._id });
                toast({
                    title: "File Is Successfully Favorited",
                    description: "You can now find your file in the favorites.",
                    variant: "success",
                    action: <ToastAction altText={"Go To"} onClick={() => router.push("/dashboard/favorites")}>Go To</ToastAction>
                })
            }}
        >
            {isFavorited ? "Unfavorite" : "Favorite"}
        </Button>
    )
}