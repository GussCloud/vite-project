import React, { useState } from "react";
import CampaignTotalEnviadosCard from "../components/CampaignTotalEnviadosCard";
import CampaignTotalRespostasCard from "../components/CampaignTotalRespostasCard";
import OverallNotasCard from "../components/OverallNotasCard";
import NPSGrid from "../components/NPSGrid";
import { FaSearch } from "react-icons/fa";

const NPS: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white w-full max-w-7xl mx-auto rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">NPS</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar respostas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-white bg-opacity-20 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-opacity-30 text-white placeholder-gray-200 w-64"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-200" />
        </div>
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
      <NPSGrid searchTerm={searchTerm} />
    </div>
  );
};

export default NPS;
