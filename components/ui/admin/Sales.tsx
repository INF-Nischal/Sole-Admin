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
  ChartOptions,
} from "chart.js";

// Register components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesProps {
  labels: string[];
  onlineSales: number[];
  inStoreSales: number[];
  title: string;
  active: string;
}

const Sales: React.FC<SalesProps> = ({
  labels,
  onlineSales,
  inStoreSales,
  title,
  active,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Online Sales",
        data: onlineSales,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "In-Store Sales",
        data: inStoreSales,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (Rs.)",
        },
      },
      x: {
        title: {
          display: true,
          text: `${
            active === "All"
              ? "Year"
              : active === "Today"
              ? "Hour"
              : active === "Week"
              ? "Day"
              : active === "Month"
              ? "Week"
              : active === "Year"
              ? "Month"
              : active
          }`,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Sales;
