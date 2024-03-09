"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { Pyramid, User } from "lucide-react";

type ChatMessagesProps = {
    listRef: RefObject<HTMLDivElement>;
    messages: {
        isViewer: boolean;
        text: string;
        _id: Id<"messages">;
        _creationTime: number;
        sessionId: string;
    }[] | undefined;
    setScrolled: Dispatch<SetStateAction<boolean>>;
}
export const ChatMessages = ({ listRef, messages, setScrolled }: ChatMessagesProps) => {

    return (
        <div ref={listRef} onWheel={() => setScrolled(true)} className="flex max-h-[calc(100vh-3.5rem-7rem)] border-primary-color flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch ">
            {messages?.map((message) => (
                <div key={message._id}>
                    <div className={cn("flex items-end", message.isViewer && "justify-end")}>
                        <div className="relative flex h-6 w-6 aspect-square items-center justify-center">
                            {message.isViewer ? (
                                <div className="flex items-center gap-x-2 pr-6">
                                    <p className="text-sm text-zinc-300 font-semibold">You</p>
                                    <User className="h-4 w-4" />
                                </div>
                            ) : (
                                <div className="flex items-center gap-x-2 pl-10">
                                    <Pyramid className="h-4 w-4" />
                                    <p className="text-sm text-zinc-300 font-semibold">Prism</p>
                                </div>
                            )}     
                        </div>
                    </div>
                    {message.text === "" ? (
                        <div className="animate-pulse rounded-md bg-primary-color/60 h-9" />
                    ) : (
                        <div className={cn("w-full rounded-lg px-4 py-2 whitespace-prewrap flex flex-col", message.isViewer ? "bg-primary-color/60 rounded-tr-none" : "bg-zinc-600 rounded-tl-none")}>
                            <span className="text-zinc-300 text-sm font-medium">{message.text}</span>
                            <span className="text-zinc-500 text-xs">{format(new Date(message._creationTime), "HH:mm")}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}