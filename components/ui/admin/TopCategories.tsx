import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface TopCategoriesProps {
  time: string;
  categoryLabels: string[];
  categoryData: number[];
}

const TopCategories: React.FC<TopCategoriesProps> = ({
  time,
  categoryLabels,
  categoryData,
}) => {
  // Data for the doughnut chart
  const data = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Sales by Color",
        data: categoryData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Options to customize the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // `as const` is required for TypeScript to ensure valid positioning
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.label}: ${tooltipItem.raw}`, // `tooltipItem` type is inferred here
        },
      },
    },
  };

  return (
    <div>
      <h2 className="font-bold">
        Top Categories {time === "All" ? "All Time" : time}
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TopCategories;
