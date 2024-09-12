"use client";

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Opcoes = () => {
  const { data, error } = useSWR('/api/opcoes', fetcher);
  
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return <div>{JSON.stringify(data)}</div>
}
