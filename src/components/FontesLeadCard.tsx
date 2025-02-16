import React from "react";
import { Pie } from "react-chartjs-2";

interface FontesLeadProps {
  fontesLeadData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const FontesLeadCard: React.FC<FontesLeadProps> = ({ fontesLeadData }) => {
  return (
    <div className="dashbaord-leadorign bg-white shadow-md rounded-lg p-6 col-span-1">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Fontes de LEAD
      </h3>
      <div className="w-full h-72">
        <Pie data={fontesLeadData} />
      </div>
    </div>
  );
};

export default FontesLeadCard;
