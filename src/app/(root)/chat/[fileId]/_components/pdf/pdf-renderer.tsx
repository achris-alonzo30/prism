"use client";

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import * as z from "zod";
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import SimpleBar from 'simplebar-react';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import { zodResolver } from '@hookform/resolvers/zod';
import { useResizeDetector } from 'react-resize-detector';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';

import { ChevronDown, ChevronUp, RotateCw, Search } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader } from '@/components/loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { PDFFullscreenDialog } from './pdf-fullscreen-dialog';


const PDFRenderer = ({ fileId }: { fileId: Id<"_storage"> }) => {
    const [renderedScale, setRenderedScale] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [scale, setScale] = useState(1);

    const fileUrl = useQuery(api.files.getFileUrl, {fileId});

    const isLoading = renderedScale !== scale;

    const pageSchema = z.object({
        page: z.string().refine((val) => Number(val) > 0 && Number(val) <= pageNumber!, { message: "Invalid page number" })
    })

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue
    } = useForm<z.infer<typeof pageSchema>>({
        resolver: zodResolver(pageSchema),
        defaultValues: {
            page: "1"
        }
    })

    const router = useRouter();
    const { toast } = useToast();

    const { width, ref } = useResizeDetector();

    const handlePageSubmit = ({ page }: z.infer<typeof pageSchema>) => {
        setCurrPage(Number(page));
        setValue("page", String(page));
    }

    return (
        <div className="w-full rounded-md shadow-md flex flex-col items-center">
            <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center space-x-2 px-4">
                    <Button
                        size="sm"
                        variant="ghost"
                        aria-label="previous page button"
                        onClick={() => {
                            setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
                            setValue("page", String(currPage - 1))
                        }}
                        disabled={currPage === 1}
                    >
                        <ChevronUp className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-x-2">
                        <Input
                            className={cn("w-12 h-8", errors.page && "focus-visible:ring-destructive")}
                            {...register("page")}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(handlePageSubmit)
                                }
                            }}
                        />
                        <p className="text-zinc-500 text-sm space-x-1">
                            <span>/</span>
                            <span>{pageNumber ?? 0}</span>
                        </p>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        aria-label="next page button"
                        onClick={() => {
                            setCurrPage((prev) => prev + 1 > pageNumber! ? pageNumber! : prev + 1);
                            setValue("page", String(currPage + 1))
                        }}
                        disabled={currPage === pageNumber || pageNumber === undefined || pageNumber === 0}
                    >
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-x-2 px-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-label="zoom" variant="ghost" size="sm" className="gap-2">
                                <Search className="h-4 w-4" />
                                {scale * 100}% <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => setScale(1)}>100%</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(1.5)}>150%</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(2)}>200%</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(2.5)}>250%</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button aria-label="rotate" variant="ghost" size="sm" onClick={() => setRotation((prev) => (prev + 90))}>
                        <RotateCw className="h-4 w-4" />
                    </Button>

                    <PDFFullscreenDialog fileId={fileId} />
                </div>
            </div>

            <div className="flex-1 w-full max-h-screen">
                <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]" >
                    <div ref={ref}>
                        <Document
                            file={fileUrl}
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
                            {isLoading && renderedScale ? (
                                <Page
                                    width={width ? width : 1}
                                    pageNumber={currPage}
                                    scale={scale}
                                    rotate={rotation}
                                    key={"@" + renderedScale}
                                />
                            ) : (
                                <Page
                                    className={cn(isLoading ? "hidden" : "")}
                                    width={width ? width : 1}
                                    pageNumber={currPage}
                                    scale={scale}
                                    rotate={rotation}
                                    key={"@" + scale}
                                    loading={
                                        <Loader />
                                    }
                                    onRenderSuccess={() => setRenderedScale(scale)}
                                />
                            )}
                        </Document>
                    </div>
                </SimpleBar>
            </div>
        </div>
    )
}

export default PDFRenderer;

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;