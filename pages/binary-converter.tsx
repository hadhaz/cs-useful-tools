import useMinHeight from "../core/hooks/useMinHeight";
import React, { useState } from "react";
import BackHome from "../core/components/BackHome";

export default function BinaryConverter() {
  const [clearence, upper, lower] = useMinHeight();
  const [binaryInput, setBinaryInput] = useState<boolean>(false);
  const [answer, setAnswer] = useState<{ binary: string; decimal: number }>({
    binary: "",
    decimal: 0,
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function convertHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const { binary, decimal } = converter(
      input,
      binaryInput ? "binary" : "decimal"
    );
    console.log(binary, decimal);
    setAnswer({
      binary,
      decimal,
    });
  }

  function switchHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setBinaryInput(!binaryInput);
  }

  const promptBinary = "Masukkan angka biner";
  const promptDecimal = "Masukkan angka desimal";
  const answerBinary = "Hasil biner";
  const answerDecimal = "Hasil desimal";

  return (
    <div style={{ minHeight: clearence }} className='bg-teal-400 pt-12 flex flex-col items-center'>
      <h1 className='text-center text-2xl font-semibold mb-8'>
        Binary Converter
      </h1>
      <div className='flex justify-center'>
        <form
          className='grid grid-cols-2 gap-x-2 w-full max-w-[800px] mx-3'
          onSubmit={submitHandler}
        >
          <div className='flex flex-col'>
            <label htmlFor='decimal' className=''>
              {binaryInput ? promptBinary : promptDecimal}
            </label>
            <input
              onChange={convertHandler}
              type='text'
              className='outline-none py-1 px-3'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='binary'>
              {binaryInput ? answerDecimal : answerBinary}
            </label>
            <div className='bg-white h-full outline-none py-1 px-3 overflow-scroll'>
              {binaryInput ? answer.decimal : answer.binary}
            </div>
          </div>
          <button
            onClick={switchHandler}
            className='py-1 px-3 col-span-2 bg-teal-600 text-white font-semibold mt-2'
          >
            Switch
          </button>
        </form>
      </div>
      <BackHome />
    </div>
  );
}

const converter = (input: string, type: string) => {
  if (type === "binary") {
    const binary = input;
    const decimal = parseInt(binary, 2);
    return { binary, decimal };
  } else {
    const decimal = parseInt(input);
    const binary = decimal.toString(2);
    return { binary, decimal };
  }
};
