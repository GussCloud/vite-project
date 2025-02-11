import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faTimes, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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
  onAgendar: () => void; // Função callback para agendar, gerenciada no componente pai
}

const origemIcones = {
  whatsapp: "fab fa-whatsapp text-green-500",
  instagram: "fab fa-instagram text-pink-500",
  facebook: "fab fa-facebook text-blue-600",
  email: "fas fa-envelope text-gray-500",
};

const dadosClienteFake = {
  loja: "Loja Central",
  dataCadastro: "01/01/2025",
  endereco: "Rua Exemplo, 123",
  cidade: "Jundiaí",
  uf: "SP",
};

const ContatoModal: React.FC<ContatoModalProps> = ({ contato, onClose, onAgendar }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [minimizado, setMinimizado] = useState(false);

  if (!contato) return null;

  if (minimizado) {
    return (
      <div
        className="fixed z-50 cursor-pointer"
        style={{ bottom: `${20 + (contato.id - 1) * 70}px`, left: "20px" }}
        title={`Abrir chat com ${contato.nome}`}
        onClick={() => setMinimizado(false)}
      >
        <img
          src={contato.foto}
          alt={contato.nome}
          className="w-12 h-12 rounded-full shadow-lg border-2 border-white"
        />
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-11/12 max-w-6xl flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-900 to-blue-500 text-white p-4 rounded-t-lg relative">
            <div className="flex items-center justify-center">
              <h2 className="text-xl font-semibold">Ações do Contato</h2>
              <div className="absolute right-4 flex space-x-2">
                <button
                  onClick={() => setMinimizado(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                  title="Minimizar"
                >
                  <FontAwesomeIcon icon={faWindowMinimize} className="text-2xl" />
                </button>
                <button
                  onClick={onClose}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  title="Fechar"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-2xl" />
                </button>
              </div>
            </div>
          </header>

          <div className="flex flex-col md:flex-row">
            {/* Coluna Esquerda: Chat */}
            <div className="w-full md:w-1/3 p-4 border-r border-gray-300 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                <i className={`${origemIcones[contato.origem]} mr-2 text-xl`}></i>
                Chat via {contato.origem.toUpperCase()}
              </h2>
              <div className="flex-1 bg-gray-100 rounded-lg p-3 overflow-y-auto h-80">
                <p className="text-gray-600 text-sm bg-white rounded-lg p-2 shadow mb-2">
                  Olá, como posso ajudar?
                </p>
                <p className="text-gray-600 text-sm bg-blue-100 rounded-lg p-2 shadow mb-2 self-end">
                  Gostaria de saber mais sobre os serviços.
                </p>
              </div>
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

            {/* Coluna Central: Histórico do Cliente */}
            <div className="w-full md:w-1/3 p-4 border-r border-gray-300 flex flex-col">
              <header className="bg-gray-200 p-3 rounded-md mb-4 text-center">
                <h2 className="text-lg font-bold text-gray-800">Histórico do Cliente</h2>
              </header>
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Últimos Agendamentos
                </h3>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={`agendamento-${item}`} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-600" />
                        <span className="text-sm">
                          10/01/2025 09:00 - AXILAS FEMININA
                        </span>
                      </div>
                      <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded">
                        Faltou
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">Últimos Contatos</h3>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={`contato-${item}`} className="flex items-center space-x-2">
                      <i className={`${origemIcones[contato.origem]} text-xl`}></i>
                      <span className="text-sm">10/01/2025 12:50</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Coluna Direita: Detalhes do Cliente */}
            <div className="w-full md:w-1/3 p-4 flex flex-col">
              <div className="text-center">
                <img
                  src={contato.foto}
                  alt={contato.nome}
                  className="w-24 h-24 rounded-full mx-auto border border-gray-300"
                />
                <h2 className="text-lg font-semibold text-gray-800 mt-2">{contato.nome}</h2>
                <p className="text-gray-600 text-sm">{contato.telefone}</p>
                <div className="relative mt-2">
                  <button
                    onClick={() => setMenuAberto(!menuAberto)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Ações ▼
                  </button>
                  {menuAberto && (
                    <div className="absolute bg-white shadow-md rounded-md mt-2 w-40 right-0 z-10">
                      <button
                        onClick={() => {
                          // Fechar o ContatoModal e abrir o modal de agendamento
                          onClose();
                          onAgendar();
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                      >
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
              <div className="mt-6 border-t border-gray-300 pt-4 text-center">
                <h3 className="text-md font-semibold text-gray-700">Dados do Cliente</h3>
                <p className="text-gray-600 text-sm mt-1 text-left">
                  <strong>Loja de Cadastro:</strong> {dadosClienteFake.loja}
                </p>
                <p className="text-gray-600 text-sm text-left">
                  <strong>Data de Cadastro:</strong> {dadosClienteFake.dataCadastro}
                </p>
                <p className="text-gray-600 text-sm text-left">
                  <strong>Endereço:</strong> {dadosClienteFake.endereco}
                </p>
                <p className="text-gray-600 text-sm text-left">
                  <strong>Cidade:</strong> {dadosClienteFake.cidade}
                </p>
                <p className="text-gray-600 text-sm text-left">
                  <strong>UF:</strong> {dadosClienteFake.uf}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContatoModal;
