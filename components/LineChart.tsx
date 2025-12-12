"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
} from "chart.js";

import { getOffertsDTO } from '@/lib/switch-deals';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyChart = ({ data }) => {
  const chartData = {
    labels: data.labels, // X-axis labels
    /*datasets: [
      {
        label: 'Sample Data1',
        data: data.line1, // Y-axis values
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Sample Data1',
        data: data.line2, // Y-axis values
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      }
    ],*/
    datasets: data.sets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      //title: { display: true, text: 'Dynamic Chart' },
    },
    scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
    
  };

  
  return <Line data={chartData} options={options} />;
};
export default MyChart;