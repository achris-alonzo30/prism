
import Link from "next/link";
import { Doc } from "../../../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { MessageCircleMore } from "lucide-react";

export const ChatButton = ({ file }: { file: Doc<"files"> }) => {
    return (
        <ActionTooltip title="Start Chatting">
            <Button asChild size="sm" className="text-zinc-500 border hover:text-white bg-transparent hover:bg-indigo-600 hover:border-indigo=600">
                <Link 
                    href={`/chat/${file.fileId}`} 
                    target='_blank' 
                    className="flex items-center text-xs font-semibold transform hover:-translate-y-1 transition-all duration-400">
                        <MessageCircleMore className="h-4 w-4" />
                    </Link>
            </Button>
        </ActionTooltip>

    )
}