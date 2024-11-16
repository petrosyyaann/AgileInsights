import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  FontSpec,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  indexAxis: 'y' as const,
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: '#373645',
      },
      grid: {
        color: '#E0E0E0',
      },
    },
    y: {
      stacked: true,
      ticks: {
        color: '#373645',
        font: {
          weight: 'bold',
        } as Partial<FontSpec>,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

interface ChartProps {
  data?: { label: string; value: number }[]
  backgroundColor?: string
  mockData: MockDataType
  // chartDataCustom?: ChartData<
  //   'bar',
  //   (number | [number, number] | null)[],
  //   unknown
  // >
}

type MockDataType = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
  }[]
}

const StackedBarChart = ({
  // data,
  mockData,
  // backgroundColor = '#D0BFFF',
}: ChartProps) => {
  // const chartData = {
  //   labels: data.map((d) => d.label),
  //   datasets: [
  //     {
  //       data: data.map((d) => d.value),
  //       backgroundColor: backgroundColor,
  //     },
  //   ],
  // }

  return <Bar data={mockData} options={options} />
}

export default StackedBarChart
