import React from "react";

interface Contato {
  id: number;
  nome: string;
  telefone: string;
  foto: string;
}

interface DetalhesContatoProps {
  contato: Contato | null;
  onClose: () => void;
}

const DetalhesContato: React.FC<DetalhesContatoProps> = ({ contato, onClose }) => {
  if (!contato) return null; // Não renderiza se não houver contato selecionado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row relative">
        {/* Botão Fechar */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl">
          &times;
        </button>

        {/* Lado Esquerdo: Chat */}
        <div className="w-full md:w-1/2 p-4 border-r">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Chat com {contato.nome}</h2>
          <div className="h-64 overflow-y-auto p-2 bg-gray-100 rounded-md">
            <div className="mb-3">
              <p className="bg-blue-500 text-white rounded-lg p-2 w-fit">Olá, {contato.nome}! Como posso te ajudar?</p>
            </div>
            <div className="mb-3 text-right">
              <p className="bg-gray-300 text-gray-800 rounded-lg p-2 w-fit ml-auto">Oi! Quero saber mais sobre seu serviço.</p>
            </div>
            <div>
              <p className="bg-blue-500 text-white rounded-lg p-2 w-fit">Claro! Vou te explicar...</p>
            </div>
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Digite uma mensagem..."
              className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Enviar
            </button>
          </div>
        </div>

        {/* Lado Direito: Informações do Contato */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center">
          <img src={contato.foto} alt={contato.nome} className="w-24 h-24 rounded-full shadow-md mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">{contato.nome}</h2>
          <p className="text-gray-600 mb-4">{contato.telefone}</p>

          {/* Informações adicionais */}
          <div className="w-full space-y-2">
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="text-gray-700">💼 Cargo: Gerente de Projetos</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="text-gray-700">🏢 Empresa: Tech Solutions</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="text-gray-700">📧 Email: contato@email.com</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="text-gray-700">📍 Localização: São Paulo - SP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesContato;
