"use client";

import { useState } from "react";
import { Protect } from "@clerk/nextjs";
import { getFileUrl } from "@/lib/get-file-url";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";

import {
     FileIcon,
     UndoIcon,
     StarHalf,
     StarIcon,
     TrashIcon,
     MoreHorizontal,
} from "lucide-react";

import {
     AlertDialog,
     AlertDialogTitle,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogContent,
     AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
     DropdownMenu,
     DropdownMenuItem,
     DropdownMenuTrigger,
     DropdownMenuContent,
     DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";



export const ActionColumns = ({
     file,
     isFavorited,
}: {
     file: Doc<"files">;
     isFavorited: boolean;
}) => {
     const deleteFile = useMutation(api.files.deleteFile);
     const restoreFile = useMutation(api.files.restoreFile);
     const toggleFavorite = useMutation(api.files.toggleFavorite);
     const { toast } = useToast();
     const me = useQuery(api.users.getSelf);

     const [isConfirmOpen, setIsConfirmOpen] = useState(false);

     return (
          <>
               <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                    <AlertDialogContent>
                         <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                   This action will mark the file for our deletion process. Files are
                                   deleted periodically
                              </AlertDialogDescription>
                         </AlertDialogHeader>
                         <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                   onClick={async () => {
                                        await deleteFile({
                                             fileId: file._id,
                                        });
                                        toast({
                                             variant: "default",
                                             title: "File marked for deletion",
                                             description: "Your file will be deleted soon",
                                        });
                                   }}
                              >
                                   Continue
                              </AlertDialogAction>
                         </AlertDialogFooter>
                    </AlertDialogContent>
               </AlertDialog>

               <DropdownMenu>
                    <DropdownMenuTrigger>
                         <MoreHorizontal className="text-center"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                         <DropdownMenuItem
                              onClick={() => {
                                   window.open(getFileUrl(file.fileId), "_blank");
                              }}
                              className="flex gap-1 items-center cursor-pointer"
                         >
                              <FileIcon className="w-4 h-4" /> Download
                         </DropdownMenuItem>

                         <DropdownMenuItem
                              onClick={() => {
                                   toggleFavorite({
                                        fileId: file._id,
                                   });
                              }}
                              className="flex gap-1 items-center cursor-pointer"
                         >
                              {isFavorited ? (
                                   <div className="flex gap-1 items-center">
                                        <StarIcon className="w-4 h-4" /> Unfavorite
                                   </div>
                              ) : (
                                   <div className="flex gap-1 items-center">
                                        <StarHalf className="w-4 h-4" /> Favorite
                                   </div>
                              )}
                         </DropdownMenuItem>

                         <Protect
                              condition={(check) => {
                                   return (
                                        check({
                                             role: "org:admin",
                                        }) || file.userId === me?._id
                                   );
                              }}
                              fallback={<></>}
                         >
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                   onClick={() => {
                                        if (file.markedForDeletion) {
                                             restoreFile({
                                                  fileId: file._id,
                                             });
                                        } else {
                                             setIsConfirmOpen(true);
                                        }
                                   }}
                                   className="flex gap-1 items-center cursor-pointer"
                              >
                                   {file.markedForDeletion ? (
                                        <div className="flex gap-1 text-green-600 items-center cursor-pointer">
                                             <UndoIcon className="w-4 h-4" /> Restore
                                        </div>
                                   ) : (
                                        <div className="flex gap-1 text-red-600 items-center cursor-pointer">
                                             <TrashIcon className="w-4 h-4" /> Delete
                                        </div>
                                   )}
                              </DropdownMenuItem>
                         </Protect>
                    </DropdownMenuContent>
               </DropdownMenu>
          </>
     );
}