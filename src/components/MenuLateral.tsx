import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/gradient.css";
import ReleaseNotes from "./ReleaseNotes"; // new import

const MenuLateral: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [submenuComunicacaoAberto, setSubmenuComunicacaoAberto] =
    useState(false);
  const [submenuConfiguracoesAberto, setSubmenuConfiguracoesAberto] =
    useState(false);
  const [releaseNotesAberto, setReleaseNotesAberto] = useState(false); // New state to control ReleaseNotes visibility

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuAberto &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        (!buttonRef.current ||
          !buttonRef.current.contains(event.target as Node))
      ) {
        fecharMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto]);

  const toggleSubmenuComunicacao = () => {
    setSubmenuComunicacaoAberto((prev) => !prev);
  };

  const toggleSubmenuConfiguracoes = () => {
    setSubmenuConfiguracoesAberto((prev) => !prev);
  };

  const abrirReleaseNotes = () => {
    setReleaseNotesAberto(true);
  };

  return (
    <div className="relative">
      {!menuAberto && (
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="menu-button fixed top-4 left-4 z-50 w-14 h-14 rounded-lg shadow-md flex items-center justify-center hover:opacity-80 transition"
          title="Abrir Menu"
        >
          <img
            src="https://storage.guss.dev.br/typebot/public/workspaces/cm5l2dige0000q70dd6nue9x1/typebots/cm6jq7pg90013q70dpz8fh5gr/blocks/das3vwdbc5ybl5x4eo1bljce?v=1738611446016"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </button>
      )}

      <div
        ref={menuRef}
        className={`fixed top-10 left-4 z-50 bg-white shadow-lg rounded-lg transform transition-all ease-in-out duration-500 ${
          menuAberto
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible"
        }`}
        style={{ width: "240px" }}
      >
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-center rounded-t-lg">
          <img
            src="https://storage.guss.dev.br/typebot/public/workspaces/cm5l2dige0000q70dd6nue9x1/typebots/cm6jq7pg90013q70dpz8fh5gr/blocks/k2f0v1ukieb1lmca124hgre0?v=1738787753588"
            alt="Logo"
            className="rounded-t-lg object-contain mx-auto"
          />
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-gray-800 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/agents"
            className="flex items-center space-x-2 text-gray-800 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
          >
            <i className="fas fa-user-tie"></i>
            <span>Agentes</span>
          </Link>

          <div>
            <button
              onClick={toggleSubmenuConfiguracoes}
              className="flex items-center justify-between w-full text-left text-gray-800 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
            >
              <span>
                <i className="fas fa-cogs"></i> Configurações
              </span>
              <i
                className={`fas fa-chevron-${
                  submenuConfiguracoesAberto ? "up" : "down"
                }`}
              ></i>
            </button>
            {submenuConfiguracoesAberto && (
              <div className="ml-4 mt-2 space-y-1">
                <Link
                  to="/canais"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
                >
                  <i className="fas fa-plug"></i>
                  <span>Canais</span>
                </Link>
                <Link
                  to="/configuracoes/fluxos-chatbot"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
                >
                  <i className="fas fa-random"></i>
                  <span>Fluxos de Chatbot</span>
                </Link>
                <Link
                  to="/SmartTags"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
                >
                  <i className="fas fa-tag"></i>
                  <span>Smart Tags</span>
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={toggleSubmenuComunicacao}
              className="flex items-center justify-between w-full text-left text-gray-800 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
            >
              <span>
                <i className="fas fa-comments"></i> Comunicação
              </span>
              <i
                className={`fas fa-chevron-${
                  submenuComunicacaoAberto ? "up" : "down"
                }`}
              ></i>
            </button>
            {submenuComunicacaoAberto && (
              <div className="ml-4 mt-2 space-y-1">
                <Link
                  to="/automacoes"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
                >
                  <i className="fas fa-cogs"></i>
                  <span>Automações</span>
                </Link>
                <Link
                  to="/kanban"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
                >
                  <i className="fas fa-columns"></i>
                  <span>Kanban</span>
                </Link>
                {/* Nova opção NPS */}
                <Link
                  to="/nps"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
                >
                  <i className="fas fa-star"></i>
                  <span>NPS</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/relatorios"
            className="flex items-center space-x-2 text-gray-800 hover:text-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition gradient-item border border-b-slate-400"
          >
            <i className="fas fa-chart-line"></i>
            <span>Relatórios</span>
          </Link>
        </nav>
        <div
          onClick={abrirReleaseNotes}
          className="cursor-pointer bg-black text-white text-xs p-1 rounded m-2 text-center"
        >
          Versão 1.0.0.0
        </div>
      </div>
      {releaseNotesAberto && (
        <ReleaseNotes
          isOpen={releaseNotesAberto}
          onClose={() => setReleaseNotesAberto(false)}
        />
      )}
    </div>
  );
};

export default MenuLateral;
