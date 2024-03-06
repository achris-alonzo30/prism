import PdfRenderer from "./_components/pdf/pdf-renderer";
import { ChatWrapper } from "./_components/chat/chat-wrapper";
import { Id } from "../../../../../convex/_generated/dataModel";

const PDFRendererPage = async ({ params }: { params: { fileId: Id<"_storage"> } }) => {

  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
        {/* Left sidebar & main wrapper */}
        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            {/* Main area */}
            <PdfRenderer fileId={params.fileId} />
          </div>
        </div>

        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
          <ChatWrapper  />
        </div>
      </div>
    </div>
  )
}

export default PDFRendererPage;