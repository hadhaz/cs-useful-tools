import { useRef, useState } from "react";
import useMinHeight from "../core/hooks/useMinHeight";
import Seo from "../core/components/SEO";
import BackHome from "../core/components/BackHome";

export default function PDFCleaner() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [clearence, upper, lower] = useMinHeight();

  function handleCleaner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const text = textRef.current!.value;

    const cleanText = text.replace(/(?<!\.|,|!|\?|"|'|\)|\]|\})\n/g, " ");
    const blob = new Blob([cleanText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned.txt";
    a.click();

    textRef.current!.value = "";
  }
  return (
    <>
      <Seo typeInput='pdf-cleaner' />
      <div style={{ minHeight: clearence }} className='bg-slate-200'>
        <h1 className='mb-1 text-3xl font-semibold pt-12 text-center'>
          PDF Cleaner
        </h1>
        <p className='text-center mb-8 font-sm'>
          Apps for clean newline in the your pdf document
        </p>
        <form onSubmit={handleCleaner} className='flex flex-col items-center'>
          <textarea
            ref={textRef}
            className='px-4 py-3 w-full max-w-[700px] h-[300px] overflow-y-scroll outline-none shadow-lg rounded-md mb-4 mx-4'
          />
          <button
            type='submit'
            className='hover:bg-slate-500 hover:text-slate-100 bg-slate-400 w-[220px] py-1 rounded-md text-lg font-medium text-slate-100'
          >
            Clean
          </button>
        </form>
        <BackHome />
      </div>
    </>
  );
}
