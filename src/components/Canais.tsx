import React, { useState } from "react";
import CanalNovo from "./CanalNovo"; // Ajuste o caminho conforme a estrutura do seu projeto

const Canais: React.FC = () => {
  const [isCanalNovoOpen, setIsCanalNovoOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white w-full max-w-7xl rounded-lg shadow-md p-4 mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Canais</h1>
        <button
          onClick={() => setIsCanalNovoOpen(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 flex items-center space-x-2 transition"
        >
          <i className="fas fa-plus-circle"></i>
          <span>Adicionar Canal</span>
        </button>
      </div>

      {/* Conteúdo dos Canais */}
      <div className="overflow-auto flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Exemplo de Canal */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Canal de WhatsApp
            </h3>
            <p className="text-gray-600 mb-2">Tipo: Mensagens Automáticas</p>
            <p className="text-gray-600 mb-4">Status: Ativo</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Canal de Instagram
            </h3>
            <p className="text-gray-600 mb-2">Tipo: Mensagens Automáticas</p>
            <p className="text-gray-600 mb-4">Status: Inativo</p>
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Canal */}
      <CanalNovo
        isOpen={isCanalNovoOpen}
        onClose={() => setIsCanalNovoOpen(false)}
      />
    </div>
  );
};

export default Canais;
