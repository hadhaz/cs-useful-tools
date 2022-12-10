import { useRef, useState } from "react";
import BackHome from "../core/components/BackHome";
import Seo from "../core/components/SEO";
import useMinHeight from "../core/hooks/useMinHeight";

export default function SubnetCalculator() {
  const [clearence, upper, lower] = useMinHeight();
  const [validity, setValidity] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "on-check">("idle");
  const [answer, setAnswer] = useState<{
    broadcast: string;
    hostCount: number;
    maskStr: string;
    subnet: string;
  }>({
    broadcast: "",
    hostCount: 0,
    maskStr: "",
    subnet: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = inputRef.current!.value;

    setStatus("on-check");

    if (validate(input)) {
      setValidity(true);
    } else {
      setValidity(false);
      return;
    }

    const { broadcast, hostCount, maskStr, subnet } = calculate(
      inputRef.current!.value
    );

    setAnswer({
      broadcast,
      hostCount,
      maskStr,
      subnet,
    });
  }

  const statusColor = validity
    ? "bg-green-400 text-slate-900"
    : "bg-red-500 text-slate-100";

  return (
    <>
      <Seo typeInput='subnet' />
      <div
        className='bg-yellow-500 flex flex-col items-center pt-20'
        style={{ minHeight: clearence }}
      >
        {status === "on-check" && (
          <div
            className={[
              "absolute top-0 w-full text-center py-1 text-lg font-medium",
              statusColor,
            ].join(" ")}
          >
            {validity ? "Success" : "Invalid Input"}
          </div>
        )}
        <h1 className='text-2xl mb-3 font-semibold'>Subnetting Calculator</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <input
            onFocus={() => setStatus("idle")}
            ref={inputRef}
            type='text'
            placeholder='198.53.67.0/28'
            className='outline-none py-1 px-3 text-xl'
          />
          <button
            type='submit'
            className='bg-amber-700 hover:bg-amber-500 duration-150 font-medium text-lg text-white py-1 px-4'
          >
            Calculate
          </button>
        </form>
        <div className='bg-slate-100 shadow-lg flex flex-col gap-1 rounded-md min-w-[40vw] w-fit mt-6 px-6 py-4'>
          <div className='flex gap-1'>
            <h3>Subnet Mask Address:</h3>
            <p>{answer.maskStr}</p>
          </div>
          <div className='flex gap-1'>
            <h3>Subnet Address:</h3>
            <p>{answer.subnet}</p>
          </div>
          <div className='flex gap-1'>
            <h3>Broadcast Address:</h3>
            <p>{answer.broadcast}</p>
          </div>
          <div className='flex gap-1'>
            <h3>Jumlah Host Tiap Subnet:</h3>
            <p>{answer.hostCount}</p>
          </div>
        </div>
        <BackHome />
      </div>
    </>
  );
}

const validate = (input: string) => {
  const regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}\/[0-9]{1,2}$/;
  if (regex.test(input)) {
    const [ip, mask] = input.split("/");
    const ipArr = ip.split(".");
    const maskNum = Number(mask);
    if (maskNum > 32) return false;
    if (ipArr.some(num => Number(num) > 255)) return false;
    return true;
  }

  return false;
};

const calculate = (input: string) => {
  const [ip, mask] = input.split("/");
  let maskNum = Number(mask);
  const ipArr = ip.split(".");
  const hostCount = 2 ** (32 - maskNum) - 2;

  const maskArr = Array(4)
    .fill(0)
    .map((_, i) => {
      if (maskNum > 8) {
        maskNum -= 8;
        return 255;
      } else if (maskNum > 0) {
        const mask = 255 - (2 ** (8 - maskNum) - 1);
        maskNum = 0;
        return mask;
      } else {
        return 0;
      }
    });

  const subnetArr = ipArr.map((num, i) => Number(num) & maskArr[i]);
  const broadcastArr = subnetArr.map((num, i) => num | (255 - maskArr[i]));
  const maskStr = maskArr.join(".");

  return {
    subnet: subnetArr.join("."),
    broadcast: broadcastArr.join("."),
    hostCount,
    maskStr,
  };
};
