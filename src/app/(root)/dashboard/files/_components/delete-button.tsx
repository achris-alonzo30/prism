"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../convex/_generated/dataModel";

import { RotateCcw, Trash } from "lucide-react";

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
import { ActionTooltip } from "@/components/action-tooltip";

export const DeleteButton = ({ file }: { file: Doc<"files"> }) => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const { toast } = useToast();

    const deleteFile = useMutation(api.files.deleteFile);
    const restoreFile = useMutation(api.files.restoreFile);

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    setIsOpen
                }
            }}
        >
            <AlertDialogTrigger asChild onClick={() => setIsOpen(true)}>
                <ActionTooltip title={file.markedForDeletion ? "Restore" : "Delete"}>
                    <Button
                        size="sm"
                        className={cn("flex w-full items-center border text-center text-sm gap-x-2 text-zinc-500 hover:text-rose-50 bg-transparent hover:bg-rose-500 hover:border-rose-500  transform hover:-translate-y-1 transition-all duration-400", file.markedForDeletion && "border text-zinc-500 hover:text-white bg-tranparent hover:bg-primary-color/90 hover:border-primary-color/90")}
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
                        {file.markedForDeletion ? <RotateCcw className="h-4 w-4" /> : <Trash className="h-4 w-4" />}
                    </Button>
                </ActionTooltip>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This file will be marked for deletion and will be deleted after a minute.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="transform hover:-translate-y-1 transition-all duration-400" onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            await deleteFile({ fileId: file._id });
                            toast({
                                title: "File Is Marked For Deletion",
                                description: "Our system will delete your file under a minute you still have a chance to restore it.",
                                variant: "default",
                                action: <ToastAction altText={"Go To"} onClick={() => router.push("/dashboard/trash")} >Go To</ToastAction>
                            })
                        }}
                        className="bg-primary-color/80 text-white hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}