import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-x-2">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            <span className="text-2xl font-semibold">Prism</span>
        </Link>
    )
}