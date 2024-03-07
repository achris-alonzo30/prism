"use client";

import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

export const ChatMessages = () => {
    const messages = useQuery(api.messages.getMessages);

    return ( 
        <div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-primary-color flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch ">
            
        </div>
    )
}