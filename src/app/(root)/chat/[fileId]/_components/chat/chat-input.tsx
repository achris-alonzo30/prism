"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";

import { Send } from "lucide-react";

import {
    Form,
    FormItem,
    FormField,
    FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";


const chatInputSchema = z.object({
    message: z.string().min(0, { message: "Please enter a message" }),
});

type ChatInputProps = {
    sessionId: string,
    setScrolled: Dispatch<SetStateAction<boolean>>
    fileId: Id<"_storage">
}

export const ChatInput = ({ sessionId, setScrolled, fileId }: ChatInputProps) => {
    const { toast } = useToast();

    const sendMessage = useMutation(api.messages.sendMessage);

    const form = useForm<z.infer<typeof chatInputSchema>>({
        resolver: zodResolver(chatInputSchema),
        defaultValues: {
            message: ""
        }
    });

    const isSubmitting = form.formState.isSubmitting;

    const handleSubmit = async (data: z.infer<typeof chatInputSchema>) => {
        try {
            await sendMessage({ message: data.message, sessionId, fileId });
        } catch (error) {
            console.error(error);
            form.reset();
            toast({
                title: "An error occurred",
                description: "We apologize for the inconvenience. Please try again later.",
                variant: "default",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            form.reset();
            setScrolled(false)
        }
    }

    return (
        <div className="absolute bottom-0 left-0 w-full pb-2">
            <Form {...form}>
                <form className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                    <div className="relative flex flex-col w-full flex-grow p-4">
                        <div className="relative">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                rows={1}
                                                maxRows={4}
                                                autoFocus
                                                placeholder="Enter your question..."
                                                disabled={isSubmitting}
                                                className="resize-none pr-12 text-base py-3 scrollbar-thumb-primary-color scrollbar-thumb-rouned scrollbar-track-primary-color-light scrollbar-w-2 scrollbar-track-rounded scrolling-touch"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault();
                                                        form.handleSubmit(handleSubmit)();
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button aria-label="Send message" type="submit" className="absolute bottom-1.5 right-[8px]" disabled={isSubmitting}><Send className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </form>
            </Form>
            <p className="text-xs text-center text-muted-foreground"><strong className="text-primary-color">Prism AI</strong> can make mistakes. Consider verifying the document and your question.</p>
        </div>
    )
}