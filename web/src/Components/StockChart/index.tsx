import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IActive } from '../../Store/modules/Actives/types';

interface Props {
  data: IActive[];
}

const StockChart: React.FC<Props> = ({ data }) => {
  function countActives(arrObj: any) {
    let stb = 0;
    let war = 0;
    let crit = 0;
    arrObj.forEach((obj: any) => {
      if (obj.healthScore >= 80) {
        stb += 1;
      }
      if (obj.healthScore > 60 && obj.healthScore < 80) {
        war += 1;
      }
      if (obj.healthScore <= 60) {
        crit += 1;
      }
    });
    return {
      stb,
      war,
      crit,
    };
  }
  const statics = countActives(data);

  const options = {
    chart: {
      type: 'column',
      // Edit chart spacing
      spacingBottom: 35,
      spacingTop: 15,
      spacingLeft: 30,
      spacingRight: 50,
      // Explicitly tell the width and height of a chart
      height: 250,

      borderRadius: 5,
      borderWidth: 0,
    },
    title: {
      text: 'Informações sobre os Ativos',
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Número de ativos',
      },
    },
    legend: false,

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> ativo(s)<br/>',
    },

    series: [
      {
        name: '',
        colorByPoint: true,
        data: [
          {
            name: 'Estável',
            y: statics.stb,
            color: '#00b300',
          },
          {
            name: 'Em Alerta',
            y: statics.war,
            color: '#ff9400',
          },
          {
            name: 'Crítico',
            y: statics.crit,
            color: '#7d0000',
          },
        ],
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StockChart;
