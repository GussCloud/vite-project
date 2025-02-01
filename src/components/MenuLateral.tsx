import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MenuLateral: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        fecharMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Botão Flutuante (Só aparece se o menu estiver fechado) */}
      {!menuAberto && (
        <button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white w-12 h-12 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-700 transition"
          title="Abrir Menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      )}

      {/* Menu Lateral */}
      <div
        ref={menuRef}
        className={`fixed top-10 left-4 z-50 bg-white shadow-lg rounded-lg transform transition-all ease-in-out duration-500 ${
          menuAberto
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible"
        }`}
        style={{
          width: "240px",
        }}
      >
        {/* Cabeçalho do Menu */}
        <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-center rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-100">Connect</h2>
        </div>

        {/* Itens do Menu */}
        <nav className="flex flex-col p-4 space-y-2">
          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg p-2 transition"
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>

          {/* Comunicação */}
          <div>
            <button className="flex items-center justify-between w-full text-left bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg p-2 transition">
              <span>
                <i className="fas fa-comments"></i> Comunicação
              </span>
              <i className="fas fa-chevron-down"></i>
            </button>
            {/* Submenu */}
            <div className="ml-4 mt-2 space-y-1">
              <Link
                to="/automacoes"
                className="flex items-center space-x-2 hover:bg-gray-200 text-gray-600 rounded-lg p-2 transition"
              >
                <i className="fas fa-cogs"></i>
                <span>Automações</span>
              </Link>
              <Link
                to="/historico-notificacoes"
                className="flex items-center space-x-2 hover:bg-gray-200 text-gray-600 rounded-lg p-2 transition"
              >
                <i className="fas fa-history"></i>
                <span>Histórico de Notificações</span>
              </Link>
              <Link
                to="/kanban"
                className="flex items-center space-x-2 hover:bg-gray-200 text-gray-600 rounded-lg p-2 transition"
              >
                <i className="fas fa-columns"></i>
                <span>Kanban</span>
              </Link>
            </div>
          </div>

          {/* Relatórios */}
          <Link
            to="/relatorios"
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg p-2 transition"
          >
            <i className="fas fa-chart-line"></i>
            <span>Relatórios</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MenuLateral;
