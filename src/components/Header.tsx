import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UnidadeModal from "./UnidadeModal"; // Novo componente de modal

const Header: React.FC = () => {
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(
    "SP - JUNDIAI - MAXI SHOPPING"
  );
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center w-full max-w-7xl mx-auto mt-4">
      {/* Botão de Seleção de Unidade */}
      <button
        onClick={() => setModalAberto(true)}
        className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2 hover:bg-gray-200 transition"
      >
        <i className="fas fa-map-marker-alt text-blue-600"></i>
        <span className="text-gray-800 font-medium">{unidadeSelecionada}</span>
      </button>

      {/* Perfil do Usuário */}
      <div className="relative flex items-center space-x-3">
        <img
          src="https://randomuser.me/api/portraits/men/5.jpg" // Foto do perfil fake
          alt="Perfil"
          className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
          onClick={() => setMenuAberto((prev) => !prev)}
        />
        <button
          onClick={() => setMenuAberto((prev) => !prev)}
          className="text-gray-800 font-medium hover:text-blue-600 transition"
        >
          João Silva
        </button>

        {/* Menu Dropdown */}
        {menuAberto && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40 p-2 animate-fade-in">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 px-3 py-2 w-full rounded-md transition"
            >
              <i className="fas fa-lock text-red-500"></i>
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal de Seleção de Unidade */}
      {modalAberto && (
        <UnidadeModal
          unidadeSelecionada={unidadeSelecionada}
          setUnidadeSelecionada={setUnidadeSelecionada}
          fecharModal={() => setModalAberto(false)}
        />
      )}
    </div>
  );
};

export default Header;
