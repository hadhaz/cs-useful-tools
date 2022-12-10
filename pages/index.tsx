import Link from "next/link";
import useMinHeight from "../core/hooks/useMinHeight";
import data from "../core/data/app-list.json";

import Seo from "../core/components/SEO";

export default function Home() {
  const [clearence, upper, lower] = useMinHeight();
  return (
    <div
      style={{ minHeight: clearence }}
      className='bg-yellow-200 flex pt-12 flex-col items-center'
    >
      <Seo typeInput='home' />

      <h1 className='text-2xl font-semibold'>List Aplikasi</h1>
      <table className='mt-6 border-collapse border border-black'>
        <thead className='bg-yellow-400'>
          <tr>
            <th className='font-semibold border border-black min-w-[256px] w-[40vw] py-1 text-center'>
              Nama Aplikasi
            </th>
            <th className='border border-black text-center font-semibold w-24 py-1'>
              URL
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className='border border-black min-w-[256px] w-[40vw] py-1 text-center'>
                {item.title}
              </td>
              <td className='border text-center text-indigo-700 font-semibold border-black w-24 py-1'>
                <Link href={item.url}>Click</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
