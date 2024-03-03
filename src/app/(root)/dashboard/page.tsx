"use client"

import { FileUpload } from '@/components/file-upload';

export default function DashboardPage() {
    return (
        <main className="container mx-auto pt-12 px-8">
            <div className="flex items-center justify-between">
                <h1>Dashboard</h1>
                <FileUpload />
            </div>

        </main>
    )
}