import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faPlus } from "@fortawesome/free-solid-svg-icons";
import NovaAutomacaoIA from "./NovaAutomacaoIA"; // ajuste o caminho conforme sua estrutura

interface NovaAutomacaoProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovaAutomacao: React.FC<NovaAutomacaoProps> = ({ isOpen, onClose }) => {
  const [isNovaAutomacaoIAOpen, setIsNovaAutomacaoIAOpen] = useState(false);

  const handleCriarIA = () => {
    // Abre o modal de criação por I.A
    setIsNovaAutomacaoIAOpen(true);
  };

  const handleCriarManual = () => {
    console.log("Criar automação manualmente clicado");
    // Implemente a lógica para criação manual, se necessário.
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Nova Automação"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white text-lg font-semibold p-4 rounded-t-lg flex justify-between items-center">
            <span>Nova Automação</span>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300"
            >
              ✖
            </button>
          </div>
          {/* Conteúdo */}
          <div className="p-8">
            <div className="flex justify-center space-x-8">
              {/* Painel para criação com Inteligência Artificial */}
              <div
                onClick={handleCriarIA}
                className="relative cursor-pointer border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg flex flex-col items-center justify-center transition duration-200 w-64 h-64"
              >
                {/* Badge "Nova" */}
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Nova
                </div>
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
                  <FontAwesomeIcon
                    icon={faMicrochip}
                    className="text-blue-500 text-4xl"
                  />
                </div>
                <p className="mt-4 font-semibold text-center">
                  Criar uma Automação com <br />
                  Inteligência Artificial
                </p>
              </div>
              {/* Painel para criação manual */}
              <div
                onClick={handleCriarManual}
                className="cursor-pointer border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg flex flex-col items-center justify-center transition duration-200 w-64 h-64"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-green-500 text-4xl"
                  />
                </div>
                <p className="mt-4 font-semibold text-center">
                  Criar uma Automação Manualmente
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Renderiza o modal NovaAutomacaoIA quando acionado */}
      {isNovaAutomacaoIAOpen && (
        <NovaAutomacaoIA
          isOpen={isNovaAutomacaoIAOpen}
          onClose={() => setIsNovaAutomacaoIAOpen(false)}
        />
      )}
    </>
  );
};

export default NovaAutomacao;
