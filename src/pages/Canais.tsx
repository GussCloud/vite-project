import React, { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import CanalNovo from "../components/CanalNovo"; // Ajuste o caminho conforme a estrutura do seu projeto

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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Card do WhatsApp */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-center items-center mb-4 space-x-2">
              <FaWhatsapp size={48} color="#25D366" />
              <img
                src="https://randomuser.me/api/portraits/women/4.jpg"
                alt="Perfil WhatsApp"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <p className="text-gray-700 text-center font-bold">
              Instancia: UnidadeJundiai
            </p>
            <p className="text-gray-700 text-center">Número: 5511987655568</p>
            <p className="text-gray-700 text-center">Status: Conectado</p>
          </div>
          {/* Card do Instagram */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-center items-center mb-4 space-x-2">
              <FaInstagram size={48} color="#E1306C" />
              <img
                src="https://randomuser.me/api/portraits/women/5.jpg"
                alt="Perfil Instagram"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <p className="text-gray-700 text-center font-bold">
              Instancia: UnidadeJundiai
            </p>
            <p className="text-gray-700 text-center">Conta: @UnidadeJundiai</p>
            <p className="text-gray-700 text-center">Status: Conectado</p>
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
