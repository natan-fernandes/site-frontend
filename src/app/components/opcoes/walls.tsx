"use client";

import { Opcao } from '@/app/types/opcao';
import { Wall } from '@/app/types/wall';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getRow = (data: Wall, index: number) => {
  console.log(JSON.stringify(data.data, null, 2))

  const put = data.data.find(x => x.Tipo === "PUT")!;
  const call = data.data.find(x => x.Tipo === "CALL")!;
  return (
    <tr key={index} className='bg-slate-300 border-b'>
      <td className='px-6 py-4'>{getCallWall(call, 1376)}</td>
      <td className='px-6 py-4'>{getPutWall(put, 1376)}</td>
    </tr>
  )
}

const getCallWall = (data: Opcao, strike: number) => {
  const wall = data['Núm. de Neg.'] * data.Gamma * 100 * strike * 0.01 * strike;
  return wall;
}

const getPutWall = (data: Opcao, strike: number) => {
  const wall = data['Núm. de Neg.'] * data.Gamma * 100 * strike * 0.01 * strike * -1;
  return wall;
}

export const Walls = () => {
  const { data, error } = useSWR<Wall[]>('/api/opcoes/walls?ticker=PETRA326', fetcher);
  
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div className='w-full'>
      <table className='w-1/w text-sm text-left'>
      <thead>
        <tr className='text-xs text-white uppercase'>
          <th scope="col" className="px-6 py-3 bg-green-600">CALL walls</th>
          <th scope="col" className="px-6 py-3 bg-red-600">PUT walls</th>
        </tr>
      </thead>
      <tbody>
        {data.map((wall, index) => getRow(wall, index))}
      </tbody>
      </table>
    </div>
  )
}
