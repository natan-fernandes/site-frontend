'use client'

import { ChangeEvent, useState } from "react";
import { Opcoes } from "./opcoes";

export const Analise = () => {
  const [acao, setAcao] = useState<string>('PETR4');
  const [precoAtivo, setPrecoAtivo] = useState<number>(1.99);
  const [vencimento, setVencimento] = useState<Date>(new Date());

  function onChangeAcao(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setAcao(value);
  }

  function onChangePrecoAtivo(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPrecoAtivo(parseFloat(value));
  }

  function onChangeVencimento(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setVencimento(new Date(value));
  }

  return (
    <div className='flex flex-col items-center justify-center px-24 py-4'>
      <div className="flex gap-2 w-full justify-center">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Código da ação</label>
          <input onChange={onChangeAcao} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="PETR4" value={acao} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Preço do ativo</label>
          <input onChange={onChangePrecoAtivo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1.99" value={precoAtivo} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Vencimento</label>
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
              </div>
              <input value={vencimento.toISOString().slice(0, 10)} onChange={onChangeVencimento} name="start" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date start"/>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 flex gap-2">
        <Opcoes codigoAcao={acao} precoAtivo={precoAtivo} vencimento={vencimento}/>
      </div>
      <br/>
    </div>
  )
}