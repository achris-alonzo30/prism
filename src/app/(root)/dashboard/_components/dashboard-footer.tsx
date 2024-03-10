
import Image from 'next/image';
import Link from 'next/link';
import { getYear } from '@/lib/get-year';
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";


export const DashboardFooter = () => {
    const year = getYear();
    return (
        <footer className="flex border-t items-center mt-12 sm:mt-24">
            <div className="container px-6 mx-auto items-center">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between py-4">

                    <div className="text-sm text-gray-500 flex flex-col sm:flex-row items-center gap-y-2 sm:gap-x-2">
                        <Image src="/logo.svg" alt="logo" width="32" height="32" />
                        <p>Powered by{" "}<strong className="font-bold text-primary-color">Chat GPT</strong> and <strong className="font-bold text-primary-color">Convex</strong></p>
                    </div>

                    <div className="flex mt-3 mx-2 sm:mt-0">
                        <Link
                            href="https://www.linkedin.com/in/lonzochris/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2 text-zinc-600 transition-colors duration-300 dark:text-zinc-300 hover:text-primary-color/70 dark:hover:text-primary-color/60"
                        >
                            <LinkedInLogoIcon className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://github.com/achris-alonzo30?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2 text-zinc-600 transition-colors duration-300 dark:text-zinc-300 hover:text-primary-color/70 dark:hover:text-primary-color/60"
                        >
                            <GitHubLogoIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
