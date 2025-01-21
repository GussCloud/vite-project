import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuLateral: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    // Limpar autenticação (se necessário)
    // Redirecionar para a tela de login
    navigate("/login");
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 z-50"
      >
        <i className="fas fa-bars text-2xl"></i>
      </button>

      {/* Menu Lateral */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <i className="fas fa-rocket text-blue-600 text-2xl"></i>
            <span className="text-xl font-bold text-gray-800">Connect</span>
          </div>
        </div>

        {/* Itens do Menu */}
        <nav className="p-4 space-y-4">
          <div>
            <button className="menu-item flex items-center w-full text-left text-gray-800 text-lg font-semibold hover:bg-gray-100 p-2 rounded-md">
              <i className="fas fa-comments mr-2"></i> Comunicação
            </button>
            <div className="ml-6 space-y-2">
              <a
                href="#"
                className="menu-item block text-gray-600 hover:text-blue-600"
              >
                Email Marketing
              </a>
              <a
                href="#"
                className="menu-item block text-gray-600 hover:text-blue-600"
              >
                SMS
              </a>
              <a
                href="#"
                className="menu-item block text-gray-600 hover:text-blue-600"
              >
                Push
              </a>
              <a
                href="#"
                className="menu-item block text-gray-600 hover:text-blue-600"
              >
                Webhooks
              </a>
            </div>
          </div>
          <div>
            <button className="menu-item flex items-center w-full text-left text-gray-800 text-lg font-semibold hover:bg-gray-100 p-2 rounded-md">
              <i className="fas fa-robot mr-2"></i> Automação
            </button>
            <div className="ml-6 space-y-2">
              <a
                href="#"
                className="menu-item block text-gray-600 hover:text-blue-600"
              >
                Fluxos
              </a>
              <a
                href="#"
                className="menu-item block text-gray-600 hover:text-blue-600"
              >
                Agendamentos
              </a>
              <a
                href="#"
                className="menu-item block text-gray-600 hover:text-blue-600"
              >
                Regras
              </a>
            </div>
          </div>
        </nav>

        {/* Botão Sair */}
        <div className="absolute bottom-4 left-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Sair
          </button>
        </div>
      </div>

      {/* Fechar o menu ao clicar fora */}
      {menuAberto && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
        ></div>
      )}
    </>
  );
};

export default MenuLateral;
