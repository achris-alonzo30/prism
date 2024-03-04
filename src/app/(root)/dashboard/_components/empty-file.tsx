import Image from "next/image";
export const EmptyFile = () => {
    return (
        <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-full">
            <Image src="/empty-file.svg" alt="No files" width={200} height={200} />
            <p className="text-lg font-semibold underline decoration-highlight-color text-primary-color decoration-4">Uh oh! It&apos; seems void down here. </p>
            <p className="text-base text-secondary-color font-medium">How about upload some of your files?</p>
        </div>
    )
}