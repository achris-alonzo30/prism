"use client";


import { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useRouter } from "next/navigation";
import { Document, Page } from "react-pdf";
import { Expand, Loader } from 'lucide-react';
import { getFileUrl } from '@/lib/get-file-url';
import { useResizeDetector } from 'react-resize-detector';
import { Id } from '../../../../../../convex/_generated/dataModel';

import {
    Dialog,
    DialogContent,
    DialogTrigger,

} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';



export const PDFFullscreenDialog = ({ fileId }: { fileId: Id<"_storage"> }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    const router = useRouter();
    const { toast } = useToast();


    const { width, ref } = useResizeDetector();
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    setIsOpen(open)
                }
            }
            }
        >
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button
                    aria-label="fullscreen"
                    variant="outline"
                    size="sm"
                >
                    <Expand className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
                    <div ref={ref}>
                        <Document
                            file={getFileUrl(fileId)}
                            className="max-h-full"
                            loading={<Loader />}
                            onLoadError={() => toast({
                                title: "Error Loading File",
                                description: "Failed to load the file. Please try again later.",
                                variant: "destructive",
                                action: <ToastAction altText="Try again" onClick={() => router.refresh()}>Try again</ToastAction>,
                            })}
                            onLoadSuccess={({ numPages }) => setPageNumber(numPages)}
                        >
                            {new Array(pageNumber).fill(0).map((_, index) => (
                                <Page
                                    key={index}
                                    width={width ? width : 1}
                                    pageNumber={index + 1}
                                />
                            ))}

                        </Document>
                    </div>
                </SimpleBar>
            </DialogContent>
        </Dialog>
    )
}