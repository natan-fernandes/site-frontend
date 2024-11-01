"use client";

import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";

export const WallsChart = () => {
  const [elementExists, setElementExists] = useState(false);

  const desenharGrafico = () => {
    let infos = [];
    const tabela = document.getElementById('tabelaOpcoes') as HTMLTableElement;
    for (let i = 0; i < tabela.rows.length; i++) {
      const row = tabela.rows[i]; 

      const infoPut = {
        vencimento: '',
        valor: 0
      };

      const infoCall = {
        vencimento: '',
        valor: 0
      };
      
      for (let j = 0; j < row.cells.length; j++) {
        const cell = row.cells[j];
    
        if (cell.classList.contains("strike")) {
          infoPut.vencimento = cell.innerText;
          infoCall.vencimento = cell.innerText;
        } else if (cell.classList.contains("putWall")) infoPut.valor = parseFloat(cell.innerText);
        else if (cell.classList.contains("callWall")) infoCall.valor = parseFloat(cell.innerText);
      }

      infos.push(infoPut);
      infos.push(infoCall);
    }

    infos = infos.filter(x => x.valor !== 0);

    const vencimentos = infos.map(x => x.vencimento);
    const walls = infos.map(x => x.valor);

    const options = {
      chart: {
        type: 'bar',
      },
      series: [{
        name: 'Strike',
        data: walls
      }],
      xaxis: {
        categories: vencimentos
      },
      yaxis: {
        tickAmount: 20,
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#78909C',
          width: 6,
          offsetX: 0,
          offsetY: 0
        },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: -100000,
              to: 0,
              color: '#F15B46'
            }, {
              from: 0,
              to: 100000,
              color: '#16A34A'
            }]
          },
          columnWidth: '100%',
        }
      }
    }
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  useEffect(() => {
    const checkElement = () => {
      const element = document.getElementById("tabelaOpcoes");
      if (elementExists) return;

      if (element) {
        setElementExists(true);
        desenharGrafico();
      } else {
        setTimeout(checkElement, 1000); // Check again after 100ms
      }
    };

    checkElement(); // Initial check
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2" id='chart'></div>
    </div>
  );
}
