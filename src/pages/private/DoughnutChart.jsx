import React from 'react'
import { Doughnut } from "react-chartjs-2"
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, LineElement, Legend} from 'chart.js';
import {useState, useEffect } from "react";


ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, LineElement, Legend
)


function DoughnutChart() {

    const [chartData, setChartData] = useState({
      datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
      setChartData({
        labels: ["John", "Kevin", "Gerog"], // numero de votos aqui
        datasets: [
          {
            label: "primeira opçao",  // a questao aqui
            data: [12, 30, 20, 7], // as 4 opçoes ecolhidas 
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 244, 87)',
              'rgb(255, 152, 18)'
            ]
          }
        ] 
      })
      setChartOptions({
        responsive: true,
        plugins: {
          positions: "top"
        },
        title: {
          display: true,
          text: "let the dogs"
        }
      })
    }, [])


/*   const ctx = document.getElementById('myChart').getContext('2d');
   const ctx = document.getElementById('doughnut'); 

   
  let doughnut = new Chart(CHART, {
    var config = {
      type: 'doughnut',
      data: 'data',
    }
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    }

  }) */

  return (
    <div>
      {/* <canvas id="myChart" width="300" height="300">
      <script src="https://cdn.jsdelivr.net/npm/chart.js">

      </script>

      </canvas>
         */}
      

    </div>
  );
}

export default DoughnutChart