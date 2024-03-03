"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    file: z.custom<File | null>((val) => val instanceof File, "File is required"),
})

export const FileUpload = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileName: "",
            file: null
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        try {
            console.log(data)
        } catch (error) {
            console.error(error)
            toast({
                title: "Something went wrong.",
                description: "File upload failed. Please try again.",
                variant: "destructive",
                action: <ToastAction altText={"Dismiss"} >Dismiss</ToastAction>
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    Upload File
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
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
                                                <Input placeholder="File Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fileName"
                                    render={({ field: { onChange }, ...field }) => (
                                        <FormItem>
                                            <FormLabel>File</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="file" 
                                                    {...field} 
                                                    onChange={(e) => {
                                                        if (!e.target.files) return;
                                                        onChange(e.target.files[0]);
                                                    }} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Upload</Button>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}