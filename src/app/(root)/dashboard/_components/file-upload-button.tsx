"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";

import { Loader2 } from "lucide-react";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
    fileName: z.string().min(1, "File name is required").max(255),
    file: z.custom<FileList>((val) => val instanceof FileList, "File is required").refine((files) => files.length > 0, "File is required"),
})

export const FileUploadButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useUser();
    const organization = useOrganization();

    const { toast } = useToast();

    const createFile = useMutation(api.files.createFile);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);

    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) { orgId = organization.organization?.id ?? user.user?.id; }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileName: "",
            file: undefined
        },
    })

    const fileRef = form.register("file", {
        required: true,
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (!orgId) return;

        const postUrl = await generateUploadUrl();

        const fileType = data.file[0].type;

        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": fileType },
            body: data.file[0]
        })

        const { storageId } = await result.json();
        
        const types = {
            "image/png": "image",
            "image/jpg": "image",
            "image/jpeg": "image",
            "image/avif": "image",
            "image/webp": "image",
            "application/pdf": "pdf",
            "text/csv": "csv"
        } as Record<string, Doc<"files">["fileType"]>;


        try {
            await createFile({
                fileName: data.fileName,
                fileId: storageId,
                orgId,
                fileType: types[fileType]
            })

            form.reset();

            setIsOpen(false);

            toast({
                title: "File uploaded.",
                description: "File uploaded successfully.",
                variant: "success",
                action: <ToastAction altText={"Dismiss"} >Dismiss</ToastAction>
            })

        } catch (error) {
            console.error(error)
            toast({
                title: "Something went wrong.",
                description: "File upload failed. Please try again.",
                variant: "destructive",
                action: <ToastAction altText={"Dismiss"} >Dismiss</ToastAction>
            })
        } finally {
            setIsOpen(false);
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                form.reset();
            }}>
            <DialogTrigger asChild>
                <Button className="flex items-center text-white text-sm gap-x-2  bg-primary-color/80 hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400" >
                    Upload File
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Upload File</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="fileName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="File Name"  {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <div className='flex items-center justify-center h-full w-full'>
                                                <Input
                                                    id="file-upload"
                                                    type="file"
                                                    {...fileRef}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-x-2 mt-2">
                                <Button type="button" onClick={() => setIsOpen(false)} variant="ghost" size="sm" className="rounded-md" >Cancel</Button>
                                <Button type="submit" disabled={isLoading} className="flex items-center text-sm gap-x-2 text-white bg-primary-color/80 hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400" size="sm">
                                    {isLoading ? (
                                        <span className="flex items-center gap-x-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Uploading...
                                        </span>
                                    ) : (
                                        <p>Upload</p>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}