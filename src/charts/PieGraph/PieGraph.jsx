import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend , Title  } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend , Title)   ;

 const options = {
  responsive: true,
   plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: 'products rate',
    },
  },
};

const data = {

  labels: ['pro1', 'pro2', 'pro3', 'pro4', 'pro5', 'pro6','pro7', 'pro8', 'pro9', 'pro10', 'pro11', 'pro12'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132 )',
        'rgba(54, 162, 235 )',
        'rgba(255, 206, 86 )',
        'rgba(75, 192, 192 )',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64 )',
        'rgba(255, 99, 132 )',
        'rgba(54, 162, 235 )',
        'rgba(255, 206, 86 )',
        'rgba(75, 192, 192 )',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64 )',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieGraph() {
return ( 
    <Pie options={options} data={data}/>
)
}
