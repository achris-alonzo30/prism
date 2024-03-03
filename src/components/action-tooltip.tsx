import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
    
} from "@/components/ui/tooltip"

export const ActionTooltip = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                <p className="font-medium text-sm capitalize">{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}