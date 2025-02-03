import React, { useState } from "react";
import Modal from "react-modal";

interface NovaAutomacaoIAProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovaAutomacaoIA: React.FC<NovaAutomacaoIAProps> = ({
  isOpen,
  onClose,
}) => {
  const [prompt, setPrompt] = useState("");

  const handleAvancar = () => {
    console.log("Avançar com o prompt:", prompt);
    // Implemente a lógica para avançar para o próximo passo.
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Nova Automação com I.A"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white text-lg font-semibold p-4 rounded-t-lg flex justify-between items-center">
          <span>Nova Automação com I.A</span>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            ✖
          </button>
        </div>
        {/* Conteúdo */}
        <div className="p-6">
          {/* Exemplo de prompt */}
          <div className="mb-4">
            <p className="text-gray-700">
              Exemplo de Prompt:{" "}
              <span className="font-medium">
                "Crie uma automação para enviar e-mails de boas-vindas para
                novos clientes."
              </span>
            </p>
          </div>
          {/* Campo de entrada para o prompt */}
          <textarea
            className="w-full h-40 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu prompt aqui..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md mr-4"
          >
            Cancelar
          </button>
          <button
            onClick={handleAvancar}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Avançar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NovaAutomacaoIA;
