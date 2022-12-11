import { useRouter } from "next/router";

export default function BackHome() {
  const router = useRouter();
  const backHandler = () => {
    router.push("/");
  };

  return (
    <div className='w-full flex flex-col items-center text-sm justify-center mt-16'>
      <p>
        Maybe you want to check out my other apps? Click the button below to go
      </p>
      <button
        onClick={backHandler}
        className='mt-2 text-base bg-slate-200 py-1 px-3 rounded-sm shadow-md hover:bg-slate-400 duration-100 text-center w-[200px]'
      >
        Back to Home
      </button>
    </div>
  );
}
