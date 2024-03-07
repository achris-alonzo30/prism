import Image from "next/image";
export const EmptyFileMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-full py-24">
            <Image src="/empty-file.svg" alt="No files" width={200} height={200} />
            {/* TODO: Dynamically change the text based on where the pages */}
            <p className="text-lg font-semibold underline decoration-highlight-color text-primary-color decoration-4">Uh oh! It&apos;s as empty as a black hole down here.</p>
            <p className="text-base text-secondary-color font-medium">How about uploading some of your files?</p>
        </div>
    )
}