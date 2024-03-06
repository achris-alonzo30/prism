"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { api } from "../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { ActionTooltip } from "@/components/action-tooltip";
import { Star, StarHalf } from "lucide-react";

export const FavoriteButton = ({ file }: { file: Doc<"files"> & { isFavorited: boolean } }) => {
    const router = useRouter();
    const { toast } = useToast();
    const toggleFavorite = useMutation(api.files.toggleFavorite);

    return (
        <ActionTooltip title={file.isFavorited ? "Unfavorite" : "Favorite"}>
            <Button
                size="sm"
                className="flex w-full border items-center text-center text-sm gap-x-2 text-zinc-500 hover:text-white bg-transparent hover:bg-yellow-600 hover:border-yellow-600 transform hover:-translate-y-1 transition-all duration-400"
                onClick={() => {
                    toggleFavorite({ fileId: file._id });

                    if (file.isFavorited)
                    toast({
                        title: "File Is Successfully Favorited",
                        description: "You can now find your file in the favorites.",
                        variant: "success",
                        action: <ToastAction altText={"Go To"} onClick={() => router.push("/dashboard/favorites")}>Go To</ToastAction>
                    })
                }}
            >
                {file.isFavorited ? <Star className="h-4 w-4" /> : <StarHalf className="h-4 w-4" />}
            </Button>
        </ActionTooltip>
    )
}