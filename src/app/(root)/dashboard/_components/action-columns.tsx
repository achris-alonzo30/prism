"use client";

import Link from "next/link";
import { useState } from "react";
import { Protect } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
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
     MessageCircleMore
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";



export const ActionColumns = ({
     file,
     isFavorited
}: {
     file: Doc<"files">;
     isFavorited: boolean
}) => {
     const [isConfirmOpen, setIsConfirmOpen] = useState(false);

     const self = useQuery(api.users.getSelf);
     const deleteFile = useMutation(api.files.deleteFile);
     const restoreFile = useMutation(api.files.restoreFile);
     const toggleFavorite = useMutation(api.files.toggleFavorite);

     const router = useRouter();
     const { toast } = useToast();

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
                    <AlertDialogCancel className="transform hover:-translate-y-1 transition-all duration-400" onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await deleteFile({
                                    fileId: file._id,
                                });
                                toast({
                                    title: "File Is Marked For Deletion",
                                    description: "Our system will delete your file under a minute and you still have a chance to restore it.",
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

               <DropdownMenu>
                    <DropdownMenuTrigger>
                         <MoreHorizontal className="text-center" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                         <DropdownMenuItem
                              onClick={() => {
                                   window.open(getFileUrl(file.fileId), "_blank");
                              }}
                              className="flex gap-x-1 items-center cursor-pointer"
                         >
                              <FileIcon className="w-4 h-4" /> Download
                         </DropdownMenuItem>

                         <DropdownMenuItem
                              onClick={() => {
                                   toggleFavorite({
                                        fileId: file._id,
                                   });
                                   const title = isFavorited ? "File Is Successfully Unfavorited" : "File Is Successfully Favorited";
                                   const description = isFavorited ? "You have removed the file from favorites." : "You can now find your file in the favorites.";
                                   const variant = isFavorited ? "default" : "success";
                                   const route = isFavorited ? "/dashboard/files" : "/dashboard/favorites";

                                   toast({
                                        title: title,
                                        description: description,
                                        variant: variant,
                                        action: <ToastAction altText={"Go To"} onClick={() => router.push(route)}>Go To</ToastAction>
                                   })
                              }}
                              className="flex gap-x-1 items-center cursor-pointer"
                         >
                              {isFavorited ? (
                                   <div className="flex gap-x-1 items-center">
                                        <StarIcon className="w-4 h-4" /> Unfavorite
                                   </div>
                              ) : (
                                   <div className="flex gap-x-1 items-center">
                                        <StarHalf className="w-4 h-4" /> Favorite
                                   </div>
                              )}
                         </DropdownMenuItem>

                         {file.fileType === "pdf" && (
                              <DropdownMenuItem
                                   className="flex gap-x-1 items-center cursor-pointer"
                              >
                                   <Link href={`/chat/${file.fileId}`} target="_blank" className="flex gap-x-1 items-center">
                                        <MessageCircleMore className="w-4 h-4" /> Chat
                                   </Link>
                              </DropdownMenuItem>
                         )}

                         <Protect
                              condition={(check) => {
                                   return (
                                        check({
                                             role: "org:admin",
                                        }) || file.userId === self?._id
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
                                             toast({
                                                  title: "File Is Successfully Restored",
                                                  description: "Your file is now restored.",
                                                  variant: "success",
                                                  action: <ToastAction altText={"Go To"} onClick={() => router.push("/dashboard/files")} >Go To</ToastAction>
                                             })
                                        } else {
                                             setIsConfirmOpen(true);
                                        }
                                   }}
                                   className="flex gap-x-1 items-center cursor-pointer"
                              >
                                   {file.markedForDeletion ? (
                                        <div className="flex gap-x-1 text-green-600 items-center cursor-pointer">
                                             <UndoIcon className="w-4 h-4" /> Restore
                                        </div>
                                   ) : (
                                        <div className="flex gap-x-1 text-red-600 items-center cursor-pointer">
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