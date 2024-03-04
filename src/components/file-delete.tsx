"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

import { Trash } from "lucide-react";

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
import { ActionTooltip } from "./action-tooltip";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";


export const FileDelete = ({ fileId }: { fileId: Id<"files"> }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const deleteFile = useMutation(api.files.deleteFile);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="flex w-full items-center text-center text-sm gap-x-2 text-rose-50 bg-rose-500 hover:bg-rose-400 transform hover:-translate-y-1 transition-all duration-400" >Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        file and remove your file from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            deleteFile({ fileId });
                            toast({
                                title: "File Deleted Successfully",
                                description: "Your file has been deleted",
                                variant: "default",
                                action: <ToastAction altText={"Dismiss"} >Dismiss</ToastAction>
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