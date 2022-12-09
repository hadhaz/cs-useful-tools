import Link from "next/link";

export default function BackHome() {
  return (
    <Link href='/'>
      <div className='mt-4 bg-slate-200 py-1 px-3 rounded-sm shadow-md hover:bg-slate-400 duration-100 text-center w-44'>
        Back to Home
      </div>
    </Link>
  );
}
