"use client";

import { Opcao } from '@/app/types/opcao';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getRow = (data: Opcao) => {
  return <tr key={data.Ticker} className='bg-slate-300 border-b'>
  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{data.Ticker}</th>
  <td className='px-6 py-4'>{data.Vencimento}</td>
  <td className='px-6 py-4'>{data.Tipo}</td>
</tr>
}

export const Opcoes = () => {
  const { data, error } = useSWR<Opcao[]>('/api/opcoes', fetcher);
  
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(JSON.stringify(data))
  return (
    <div className='w-full'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
        <tr className='text-xs text-gray-700 uppercase bg-sky-500'>
          <th scope="col" className="px-6 py-3">Ticker</th>
          <th scope="col" className="px-6 py-3">Vencimento</th>
          <th scope="col" className="px-6 py-3">Tipo</th>
        </tr>
        {data.map(getRow)}
      </table>
    </div>
  )
}
