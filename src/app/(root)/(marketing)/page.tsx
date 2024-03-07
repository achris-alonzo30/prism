
import Link from 'next/link';
import Image from 'next/image';

import { 
  Zap,
  Users,
  Hourglass,
  ArrowRight, 
  BotMessageSquare,    
} from 'lucide-react';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { TextGenerateEffect } from '@/components/animated-ui/text-generate-effect';

const words = `Unlock real-time insights with Prism's lightning speed and AI-driven mastery, empowering students for efficient document management and accelerating success.`;

export default function Home() {
  return (
    <>
      <main className='mx-auto w-full max-w-screen-xl px-2.5 md:px-20 mb-12 mt-12 sm:mt-26 flex flex-col items-center justify-center text-center'>
        <div className='flex h-8 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 transform hover:-translate-y-1 transition-all duration-400'>
          <p className='text-sm font-semibold text-primary-color'>
            Prism v.0.0.1
          </p>
        </div>
        <h1 className='max-w-4xl text-5xl font-semibold md:text-6xl lg:text-7xl mt-8'>
          Your documents <br />
          just got smarter with <br />
          <span className='text-primary-color font-bold'>Prism&apos;s AI-Powered Storage.</span>{' '}

        </h1>
        <p className='mt-5 max-w-prose text-zinc-400 sm:text-lg text-center tracking-tight'>
          Elevate your files to a whole new level.
          Ask questions, extract insights, and make your documents work for you.
          Experience the future of file management with Prism.
        </p>

        <Button size="default" className="mt-5 text-white bg-primary-color/80 hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400" asChild>
          <Link
            className="flex items-center gap-x-2"
            href='/dashboard/files'
          >
            Get started
            <ArrowRight className='h-5 w-5' />
          </Link>
        </Button>


      </main>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2bf8b5] to-[#D32AF7] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.png'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2bf8b5] to-[#D32AF7] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl sm:text-5xl'>
              Your Document <span className="text-primary-color">Dynamo</span>
            </h2>
            <p className='mt-4 text-lg text-gray-400'>
              Effortless collaboration, lightning-fast updates, and AI insight on your documents.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary-color'>
                Step 1
              </span>
              <span className='text-xl font-semibold'>
                Sign Up For Free
              </span>
              <span className='mt-2 text-zinc-500'>
                <strong className="text-zinc-400">Start out for free</strong> you can always{" "}
                <Link
                  href='/pricing'
                  className='text-primary-color underline decoration-2 decoration-secondary-color hover:text-hover-primary-color hover:decoration-highlight-color'>
                  upgrade
                </Link>{" "}
                later.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary-color'>
                Step 2
              </span>
              <span className='text-xl font-semibold'>
                Upload Your Documents
              </span>
              <span className='mt-2 text-zinc-500'>
                <strong className="text-zinc-400">Instant Updates</strong> experience the speed of Prism - your files are instantly updated and ready for you.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary-color'>
                Step 3
              </span>
              <span className='text-xl font-semibold'>
                Organize & Collaborate
              </span>
              <span className='mt-2 text-zinc-500'>
                <strong className="text-zinc-400">Collaborate with Ease</strong> - create your organization, add peers, and control actions effortlessly for smooth collaboration.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary-color'>
                Step 4
              </span>
              <span className='text-xl font-semibold'>
                Extract Insights
              </span>
              <span className='mt-2 text-zinc-500'>
                <strong className="text-zinc-400">Harness the power of AI </strong> - 
                maximize your productivity with AI analyzing your documents, providing quick answers and fresh insights.
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>

        <div className='mt-16 flow-root sm:mt-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <TextGenerateEffect words={words} />
            </div>
            <div className='mx-auto max-w-2xl sm:text-center mt-12'>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                <p className="p-2 flex flex-col">
                  <strong className="flex items-center"><Hourglass className="w-4 h-4 mr-2" />Real-Time Storage</strong>
                  <span className="text-start text-zinc-400">Instant updates for actions, ensuring your data is always up to date.</span>
                </p>
                <div className="p-2 flex flex-col">
                  <strong className="flex items-center"><Zap className="w-4 h-4 mr-2" />Lightning Fast</strong>
                  <span className="text-start text-zinc-400">Lightning speed operations for seamless and efficient user experience.</span>
                </div>
                <div className="p-2 flex flex-col">
                  <strong className="flex items-center"><BotMessageSquare className="w-4 h-4 mr-2" />AI Powered</strong>
                  <span className="text-start text-zinc-400">Intelligent document analysis, providing insights and answering queries dynamically.</span>
                </div>
                <div className="p-2 flex flex-col">
                  <strong className="flex items-center"><Users className="w-4 h-4 mr-2" />Organization Role Collaboration</strong>
                  <span className="text-start text-zinc-400">Collaborate effortlessly with precise control, empowering teamwork for unparalleled productivity.</span>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
      <Footer />
    </>
  )
}
