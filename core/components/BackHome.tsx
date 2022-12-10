import Link from "next/link";

export default function BackHome() {
  return (
    <Link href='/'>
      <div className='mt-2 bg-slate-200 py-1 px-3 rounded-sm shadow-md hover:bg-slate-400 duration-100 text-center w-fit mx-auto max-w-[176px]'>
        Back to Home
      </div>
    </Link>
  );
}
