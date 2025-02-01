import React, { useState } from "react";

interface Contato {
  id: number;
  nome: string;
  telefone: string;
  foto: string;
  origem: "whatsapp" | "instagram" | "facebook" | "email";
}

interface ContatoModalProps {
  contato: Contato | null;
  onClose: () => void;
}

// Ícones das redes sociais
const origemIcones = {
  whatsapp: "fab fa-whatsapp text-green-500",
  instagram: "fab fa-instagram text-pink-500",
  facebook: "fab fa-facebook text-blue-600",
  email: "fas fa-envelope text-gray-500",
};

// Simulando dados de preferências e histórico
const preferenciasFake = {
  unidade: "JUNDIAÍ",
  dataCadastro: "01/01/2025",
  historico: [
    "01/01/2025 - AXILAS FEMININA",
    "12/01/2025 - FAIXA DE BARBA",
    "20/01/2025 - MEIA PERNA",
  ],
};

const ContatoModal: React.FC<ContatoModalProps> = ({ contato, onClose }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  if (!contato) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Painel Principal */}
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl flex">
        {/* Chat - Lado Esquerdo */}
        <div className="w-1/2 p-4 border-r border-gray-300 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <i className={`${origemIcones[contato.origem]} mr-2 text-xl`}></i>
            Chat via {contato.origem.toUpperCase()}
          </h2>

          <div className="flex-1 bg-gray-100 rounded-lg p-3 overflow-y-auto h-80">
            {/* Simulando mensagens */}
            <p className="text-gray-600 text-sm bg-white rounded-lg p-2 shadow mb-2">
              Olá, como posso ajudar?
            </p>
            <p className="text-gray-600 text-sm bg-blue-100 rounded-lg p-2 shadow mb-2 self-end">
              Gostaria de saber mais sobre os serviços.
            </p>
          </div>

          {/* Campo de mensagem */}
          <div className="mt-3 flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm"
              placeholder="Digite sua mensagem..."
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>

        {/* Detalhes do Cliente - Lado Direito */}
        <div className="w-1/2 p-4 flex flex-col">
          {/* Foto e Nome */}
          <div className="text-center">
            <img
              src={contato.foto}
              alt={contato.nome}
              className="w-24 h-24 rounded-full mx-auto border border-gray-300"
            />
            <h2 className="text-lg font-semibold text-gray-800 mt-2">
              {contato.nome}
            </h2>
            <p className="text-gray-600 text-sm">{contato.telefone}</p>

            {/* Botão de Ações */}
            <div className="relative mt-2">
              <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Ações ▼
              </button>
              {menuAberto && (
                <div className="absolute bg-white shadow-md rounded-md mt-2 w-40 right-0 z-10">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                    Agendar
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                    Nova Proposta
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                    Visão 360
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Informações do Cliente */}
          <div className="mt-6 border-t border-gray-300 pt-4">
            <h3 className="text-md font-semibold text-gray-700">
              Preferências
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              <strong>Unidade de Preferência:</strong>{" "}
              {preferenciasFake.unidade}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Data de Cadastro:</strong> {preferenciasFake.dataCadastro}
            </p>

            {/* Histórico de Agendamentos */}
            <h3 className="text-md font-semibold text-gray-700 mt-4">
              Últimos Agendamentos
            </h3>
            <ul className="text-gray-600 text-sm mt-1">
              {preferenciasFake.historico.map((item, index) => (
                <li key={index} className="mt-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Botão Fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-200 hover:text-white text-2xl"
      >
        &times;
      </button>
    </div>
  );
};

export default ContatoModal;
