"use client";

import * as z from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";

const formSchema = z.object({
    query: z.string(),
});

export const SearchBar = ({ setQuery, query }: { query: string, setQuery: Dispatch<SetStateAction<string>> }) => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setQuery(data.query);
            form.reset();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center w-full transform hover:-translate-y-1 transition-all duration-400">
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input placeholder="Search" {...field} className="flex h-10 w-full rounded-s-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" dir="ltr" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <button type="submit" className="inline-flex items-center h-10 px-3 py-2 bg-primary-color hover:bg-primary-color/80 justify-center whitespace-nowrap rounded-s-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" dir="rtl"><Search className="h-4 w-4 text-black" /></button>
            </form>

        </Form>
    )
}