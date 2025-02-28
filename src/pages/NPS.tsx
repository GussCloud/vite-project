import React from "react";
import CampaignTotalEnviadosCard from "../components/CampaignTotalEnviadosCard";
import CampaignTotalRespostasCard from "../components/CampaignTotalRespostasCard";
import OverallNotasCard from "../components/OverallNotasCard";
import NPSGrid from "../components/NPSGrid"; // Import the new component

const NPS: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white w-full max-w-7xl mx-auto rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">NPS</h1>
      </div>

      {/* Cards - grid com 4 colunas */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-6">
        <div className="col-span-4 lg:col-span-1">
          <CampaignTotalEnviadosCard />
        </div>
        <div className="col-span-4 lg:col-span-2">
          <CampaignTotalRespostasCard />
        </div>
        <div className="col-span-4 lg:col-span-1">
          <OverallNotasCard />
        </div>
      </div>

      {/* Render the new NPSGrid below the cards */}
      <NPSGrid />
    </div>
  );
};

export default NPS;
