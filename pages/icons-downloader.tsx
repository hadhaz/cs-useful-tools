import { useRef, useState } from "react";
import BackHome from "../core/components/BackHome";
import Status from "../core/components/Status";
import useMinHeight from "../core/hooks/useMinHeight";

export default function IconsDownloader() {
  const [clearence, upper, lower] = useMinHeight();
  const [isSVG, setIsSVG] = useState<boolean>(false);
  const [inputValidity, setInputValidity] = useState<boolean | null>(null);
  const [url, setUrl] = useState<string>("");
  const linkRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  async function downloadHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const base_api = process.env.NEXT_PUBLIC_ICONS8_API_BASE;
    const converter_api = process.env.NEXT_PUBLIC_ICONS8_API_CONVERTER;

    const link = linkRef.current!.value;

    if (!validateLink(link)) {
      setInputValidity(false);
      return;
    }

    const type = isSVG ? "svg" : "png";
    const { id, name } = parseLink(link);
    const url = `${base_api}?id=${id}&svg=true`;

    const result = await fetch(url);
    const data = await result.json();

    const svg = data.icon.svg;
    const svgStr = atob(svg);

    // decode base64 to blob

    // https://img.icons8.com/plainConverter?fromSite=true&format=png&size=30&id=69880
    const imageResult = await fetch(
      `${converter_api}?fromSite=true&format=png&size=${
        sizeRef.current!.value
      }&id=${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          svg: svgStr,
          format: type,
          size: parseInt(sizeRef.current!.value),
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const blob = await imageResult.blob();
    const urlObj = URL.createObjectURL(blob);
    setUrl(urlObj);

    if (data.success) {
      console.log(svgStr);
    } else {
      console.log(data.error);
    }
  }

  function optionHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setUrl("");
    if (e.target.value === "svg") {
      setIsSVG(true);
    } else {
      setIsSVG(false);
    }
  }

  function resetUrl() {
    setUrl("");
    setInputValidity(null);
  }

  return (
    <>
      <Status validity={inputValidity} />
      <div style={{ minHeight: clearence }} className='bg-slate-400'>
        <h1 className='text-xl text-center font-semibold pt-12'>
          Icons8 Downloader
        </h1>
        <form
          onSubmit={submitHandler}
          className='flex flex-col max-w-[50vw] mx-auto mt-10'
        >
          <label htmlFor='link'>Masukkan Link</label>
          <input
            ref={linkRef}
            onFocus={resetUrl}
            onChange={resetUrl}
            type='url'
            className='outline-none py-2 px-4'
            placeholder='https://icons8.com/icon/63370/bonds'
          />
          <label htmlFor='type' className='mt-2'>
            Pilih Tipe File
          </label>
          <select
            onChange={optionHandler}
            onFocus={resetUrl}
            name='type'
            id='type'
            className='py-2 my-1 px-3'
          >
            <option value='png'>PNG</option>
            <option value='svg'>SVG</option>
          </select>

          {!isSVG && (
            <div className='flex flex-col'>
              <label htmlFor='size' className='mt-2'>
                Pilih Ukuran (px)
              </label>
              <input
                onFocus={resetUrl}
                onChange={resetUrl}
                ref={sizeRef}
                type='number'
                className='outline-none py-1 px-3'
              />
            </div>
          )}
          <button
            onClick={downloadHandler}
            className='mt-6 bg-orange-500 py-2 font-medium w-full'
          >
            {url === "" && "Hack It!"}
            {url !== "" && "Hack Again!"}
          </button>
          {url !== "" && (
            <a
              href={url}
              download
              className='mt-2 font-medium text-indigo-600 visited:text-indigo-800'
            >
              Download Here
            </a>
          )}
        </form>
        <p className='mt-12 text-center'>
          Don&apos;t using this for commercial, i create it just for educational
          purpose
        </p>
        <div className='flex flex-col items-center mt-24'>
          <p>You can also check my another apps</p>
          <BackHome />
        </div>
      </div>
    </>
  );
}

function parseLink(link: string) {
  const linkArr = link.split("/");
  const id = linkArr[4];
  const name = linkArr[linkArr.length - 2];
  return { id, name };
}

function validateLink(link: string) {
  const regex = /https:\/\/icons8.com\/icon\/\d+\/\w+/;
  return regex.test(link);
}
