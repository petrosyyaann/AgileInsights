import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

interface PieChartProps {
  percent: number
  color: string
}

const PieChart: React.FC<PieChartProps> = ({ percent, color }) => {
  const data = {
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: [color, '#F5F4FC'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  return <Pie data={data} options={options} id={String(percent)} />
}

export default PieChart
