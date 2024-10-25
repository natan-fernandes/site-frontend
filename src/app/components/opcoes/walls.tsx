"use client";

import { Opcao } from '@/app/types/opcao';
import { Wall } from '@/app/types/wall';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getRow = (data: Wall, precoAtivo: number) => {
  if (!data) return;
  const put = data.data.find(x => x.Tipo === "PUT")!;
  const call = data.data.find(x => x.Tipo === "CALL")!;

  const putWall = getPutWall(put, precoAtivo);
  const callWall = getCallWall(call, precoAtivo);
  const gex = callWall + putWall;
  return (
    <>
      <td className='px-6 py-4 bg-green-600/10'>{callWall.toFixed(2)}</td>
      <td className='px-6 py-4 bg-red-600/10'>{putWall.toFixed(2)}</td>
      <td className='px-6 py-4'>{gex.toFixed(2)}</td>
    </>
  )
}

const getCallWall = (data: Opcao, precoAtivo: number) => {
  const wall = data ? data['Núm. de Neg.'] * (data.Gamma /  1000) * 100 * precoAtivo * 0.01 * precoAtivo : 0;
  return wall;
}

const getPutWall = (data: Opcao, precoAtivo: number) => {
  const wall = data ? data['Núm. de Neg.'] * (data.Gamma / 1000) * 100 * precoAtivo * 0.01 * precoAtivo * -1 : 0;
  return wall;
}

interface WallsProps {
  strike: number;
  vencimento: string;
  precoAtivo: number;
}

export const Walls = (props: WallsProps) => {
  const { data, error } = useSWR<Wall[]>(`/api/opcoes/walls?vencimento=${props.vencimento}&strike=${props.strike}`, fetcher);
  if (error) return <td colSpan={2}>Failed to load</td>
  if (!data) return <td colSpan={2}>Loading...</td>
  
  return (getRow(data[0], props.precoAtivo))
}
