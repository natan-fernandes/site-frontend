"use client";

import { Opcao } from '@/app/types/opcao';
import useSWR from 'swr';
import { Walls } from './walls';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getRow = (data: Opcao, precoAtivo: number) => {
  return <tr key={data.Ticker} className='bg-slate-300 border-b'>
  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{data.Ticker}</th>
  <td className='px-6 py-4'>{data.Vencimento}</td>
  <td className='px-6 py-4'>{data.Tipo}</td>
  <td className='px-6 py-4'>{data['Vol. Financeiro']}</td>
  <td className='px-6 py-4'>{(data.Strike/100).toFixed(2)}</td>
  <Walls precoAtivo={precoAtivo} strike={data.Strike} vencimento={data.Vencimento}/>
</tr>
}

interface OpcoesProps {
  codigoAcao: string;
  precoAtivo: number;
  vencimento: Date;
}

export const Opcoes = (props: OpcoesProps) => {
  const { data, error } = useSWR<Opcao[]>(`/api/opcoes?acao=${props.codigoAcao}&vencimento=${props.vencimento.toLocaleDateString()}`, fetcher);
  
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div className='w-full'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
        <thead>
          <tr className='text-xs text-gray-700 uppercase bg-sky-500'>
            <th scope="col" className="px-6 py-3">Ticker</th>
            <th scope="col" className="px-6 py-3">Vencimento</th>
            <th scope="col" className="px-6 py-3">Tipo</th>
            <th scope="col" className="px-6 py-3">Volume</th>
            <th scope="col" className="px-6 py-3">Strike</th>
            <th scope="col" className="px-6 py-3 bg-green-600">CALL walls</th>
            <th scope="col" className="px-6 py-3 bg-red-600">PUT walls</th>
            <th scope="col" className="px-6 py-3">GEX</th>
          </tr>
        </thead>
        <tbody>
        {data.sort((a, b) => b['Vol. Financeiro'] - a['Vol. Financeiro']).map((item) => getRow(item, props.precoAtivo))}
        </tbody>
      </table>
    </div>
  )
}
