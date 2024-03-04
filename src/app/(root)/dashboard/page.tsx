"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { Triangle } from "react-loader-spinner";
import { api } from "../../../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";

import { FileUpload } from '@/components/file-upload';
import { FileCard } from "@/components/file-card";


export default function DashboardPage() {
    const user = useUser();
    const organization = useOrganization();

    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }

    const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip")
    const isLoading = files === undefined;


    return (
        <main className="container mx-auto pt-12 px-8">
            {!isLoading && files.length === 0 ? (
                <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-full">
                    <Image src="/empty-file.svg" alt="No files" width={200} height={200} />
                    <p className="text-lg font-semibold underline decoration-highlight-color text-primary-color decoration-4">Uh oh! It&apos; seems void down here. </p>
                    <p className="text-base text-secondary-color font-medium">How about upload some of your files?</p>
                    <FileUpload />
                </div>
            ) : (
                <div className="flex items-center justify-between mb-10 sm:mb-20">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <FileUpload />
                </div>
            )}

            {isLoading && (
                <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-full">
                    <Triangle
                        visible={true}
                        height="80"
                        width="80"
                        color="#2bf8b5"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <p className="text-lg font-semibold underline decoration-highlight-color text-primary-color decoration-4">Loading Your Files</p>
                </div>
            )}


            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files?.map((file) => (
                    <FileCard key={file._id} file={file} />
                ))}
            </div>

        </main>
    )
}