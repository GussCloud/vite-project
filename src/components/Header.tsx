import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UnidadeModal from "./UnidadeModal";
import ReleaseNotes from "./ReleaseNotes";



const Header: React.FC = () => {
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("SP - JUNDIAI - MAXI SHOPPING");
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [notificacoesAberto, setNotificacoesAberto] = useState(false);
  const [releaseNotesOpen, setReleaseNotesOpen] = useState(false);
  const navigate = useNavigate();

  const notificacoesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificacoesAberto &&
        notificacoesRef.current &&
        !notificacoesRef.current.contains(event.target as Node)
      ) {
        setNotificacoesAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificacoesAberto]);

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center w-full max-w-7xl mx-auto mt-4 relative">
      {/* Botão de Seleção de Unidade */}
      <button
        onClick={() => setModalAberto(true)}
        className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2 hover:bg-gray-200 transition"
      >
        <i className="fas fa-map-marker-alt text-blue-600"></i>
        <span className="text-gray-800 font-medium">{unidadeSelecionada}</span>
      </button>

      {/* Container de Ações do Usuário */}
      <div className="flex items-center space-x-3">
        {/* Botão de Notificação */}
        <div className="relative">
          <button
            onClick={() => setNotificacoesAberto((prev) => !prev)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <i className="fas fa-bell text-gray-800 text-xl"></i>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </button>
          {notificacoesAberto && (
            <div
              ref={notificacoesRef}
              className="absolute top-10 right-0 bg-white shadow-lg rounded-md w-80 p-2 animate-fade-in z-10"
            >
              <div className="border border-gray-200 rounded p-2 h-20 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-black block">Atualizações</span>
                  <p className="text-xs text-gray-600">Uma nova versão 1.0.0.0 foi instalada</p>
                </div>
                <button
                  onClick={() => {
                    setNotificacoesAberto(false);
                    setReleaseNotesOpen(true);
                  }}
                  className="text-xs text-blue-500 hover:underline self-end"
                >
                  Ver mais
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Perfil do Usuário */}
        <div className="relative flex items-center space-x-3">
          <img
            src="https://randomuser.me/api/portraits/men/5.jpg"
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
      </div>

      {/* Modal de Seleção de Unidade (com seleção aninhada) */}
      {modalAberto && (
        <UnidadeModal
          unidadeSelecionada={unidadeSelecionada}
          setUnidadeSelecionada={setUnidadeSelecionada}
          fecharModal={() => setModalAberto(false)}
        />
      )}

      {/* Modal de Release Notes */}
      {releaseNotesOpen && (
        <ReleaseNotes
          isOpen={releaseNotesOpen}
          onClose={() => setReleaseNotesOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
