'use client'

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

export default function GameChart({ history }: any) {

  const data = {
    labels: history.map((h: any) => `Q${h.quarter}`),
    datasets: [
      {
        label: "Cash",
        data: history.map((h: any) => h.cash),
        borderColor: "blue"
      }
    ]
  }

  return (
    <div className="w-96">
      <Line data={data} />
    </div>
  )
}