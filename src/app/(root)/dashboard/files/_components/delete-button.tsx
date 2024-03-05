"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../convex/_generated/dataModel";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";



export const DeleteButton = ({ file }: { file: Doc<"files"> }) => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const { toast } = useToast();

    const deleteFile = useMutation(api.files.deleteFile);
    const restoreFile = useMutation(api.files.restoreFile);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    className={cn("flex w-full items-center text-center text-sm gap-x-2 text-rose-50 bg-rose-500 hover:bg-rose-400 transform hover:-translate-y-1 transition-all duration-400", file.markedForDeletion && "bg-primary-color/80 hover:bg-primary-color/90")}
                    onClick={async () => {
                        if (file.markedForDeletion) {
                            await restoreFile({ fileId: file._id })
                            toast({
                                title: "File Is Successfully Restored",
                                description: "Your file is now restored.",
                                variant: "success",
                                action: <ToastAction altText={"Go To"} onClick={() => router.push("/dashboard/files")} >Go To</ToastAction>
                            })
                        } else {
                            setIsOpen(true)
                        }
                    }}
                >
                    {file.markedForDeletion ? "Restore" : "Delete"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This file will be marked for deletion and will be deleted after a minute.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            await deleteFile({ fileId: file._id });
                            toast({
                                title: "File Is Successfully Marked For Deletion",
                                description: "Our system will delete your file under a minute you still have a chance to restore it.",
                                variant: "default",
                                action: <ToastAction altText={"Go To"} onClick={() => router.push("/dashboard/trash")} >Go To</ToastAction>
                            })
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}