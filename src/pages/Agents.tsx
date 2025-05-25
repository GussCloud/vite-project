import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Agents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white w-full max-w-7xl mx-auto rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Agentes</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar agentes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-white bg-opacity-20 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-opacity-30 text-white placeholder-gray-200 w-64"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-200" />
        </div>
      </div>

      {/* Conteúdo principal da página */}
      <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Lista de Agentes</h2>
        <p>Conteúdo da página de Agentes em desenvolvimento.</p>
      </div>
    </div>
  );
};

export default Agents;