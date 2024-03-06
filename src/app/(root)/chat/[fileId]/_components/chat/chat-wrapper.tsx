import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";

export const ChatWrapper = () => {
    return ( 
        <div className="relative min-h-full flex flex-col divide-y divide-primary-color/80 justify-between gap-2 ">
            <div className="flex-1 justify-between flex flex-col mb-28">
                <ChatMessages />
            </div>

            <ChatInput />
        </div>
    )
}