import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActivityChart = ({ activityData }) => {
  if (!activityData) return null;
  const data = {
    labels: activityData.labels,
    datasets: [
      {
        label: "Atividade",
        data: activityData.values,
        backgroundColor: "#f59e42",
        borderRadius: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Atividade por Horário", color: "#fff", font: { size: 18 } },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#444" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#444" },
      },
    },
  };
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-2xl mx-auto mb-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActivityChart; 