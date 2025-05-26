import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  x: string;
  y: number;
}

interface DashCardProps {
  type: "bargraph"; // Currently only supporting bargraph, more types can be added later
  title: string;
  values: DataPoint[];
}

const DashCard: React.FC<DashCardProps> = ({ type, title, values }) => {
  // Prepare data according to the card type
  const renderCardContent = () => {
    switch (type) {
      case "bargraph":
        const chartData = {
          labels: values.map((value) => value.x),
          datasets: [
            {
              data: values.map((value) => value.y),
              backgroundColor: [
                "rgba(66, 153, 225, 0.8)", // blue
                "rgba(72, 187, 120, 0.8)", // green
                "rgba(237, 137, 54, 0.8)", // orange
                "rgba(229, 62, 62, 0.8)",  // red
                "rgba(128, 90, 213, 0.8)", // purple
                "rgba(237, 100, 166, 0.8)" // pink
              ],
              borderColor: [
                "rgba(66, 153, 225, 1)",
                "rgba(72, 187, 120, 1)",
                "rgba(237, 137, 54, 1)",
                "rgba(229, 62, 62, 1)",
                "rgba(128, 90, 213, 1)",
                "rgba(237, 100, 166, 1)"
              ],
              borderWidth: 1,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context: any) => ` ${context.parsed.y}`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        };

        return (
          <div className="w-full h-72">
            <Bar data={chartData} options={options} />
          </div>
        );
      default:
        return <div>Tipo de card não suportado</div>;
    }
  };

  return (
    <div className="dash-card bg-white shadow-md rounded-lg p-6 col-span-1 transition-transform hover:scale-[1.02]">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {title}
      </h3>
      {renderCardContent()}
    </div>
  );
};

export default DashCard;