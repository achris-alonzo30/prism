
import Link from 'next/link';
import { getYear } from '@/lib/get-year';
import { Logo } from '@/components/logo';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export const Footer = () => {
    const year = getYear();
    return (
        <footer className="mt-10 border-t">
            <div className="container px-6 py-8 mx-auto">
                <div className="flex flex-col items-center text-center">
                    <Logo />

                    <p className="max-w-md mx-auto mt-4 text-gray-500 dark:text-gray-400">Where Real-Time Storage Meets the Power of AI. </p>

                    <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
                        <Button size="default" className="mt-5 text-white bg-primary-color/80 hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400" asChild>
                            <Link
                                className="flex items-center gap-x-2"
                                href='/dashboard/files'
                                target='_blank'>
                                Get Started For Free
                                <ArrowRight className='h-5 w-5' />
                            </Link>
                        </Button>
                    </div>
                </div>

                <hr className="my-10 border-gray-200 dark:border-gray-700" />

                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-sm text-gray-500">© Copyright {year} . All Rights Reserved.</p>

                    <div className="flex mt-3 -mx-2 sm:mt-0">
                        <Link
                            href="https://www.linkedin.com/in/lonzochris/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2 text-zinc-600 transition-colors duration-300 dark:text-zinc-300 hover:text-primary-color/70 dark:hover:tetx-primary-color/60"
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
