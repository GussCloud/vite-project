import React, { useState, useRef, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import ContatoModal from "../components/ContatoModal";
import ContatoAgendar from "../components/ContatoAgendar";
import KanbanCard from "../components/KanbanCard";
import { FaPlus, FaThLarge, FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa"; // Updated Ícones

interface Lead {
  id: number;
  nome: string;
  telefone: string;
  foto: string;
  origem: "whatsapp" | "instagram" | "facebook" | "email";
  tags: string[];
  dataCriacao: Date;
}

// Cores e nomes das colunas
const columnConfig: Record<string, { color: string; name: string }> = {
  leadsEntrada: { color: "#2346b8", name: "LEADS DE ENTRADA" },
  decidindo: { color: "#5828a6", name: "DECIDINDO" },
  emAtendimento: { color: "#269653", name: "EM ATENDIMENTO" },
  agendados: { color: "#b8ae27", name: "AGENDADOS" },
  aguardandoResposta: { color: "#a82741", name: "AGUARDANDO RESPOSTA" },
};

const Kanban: React.FC = () => {
  // Estado para gerenciar os contatos abertos (cada um com seu modal/float button)
  const [openContatos, setOpenContatos] = useState<Lead[]>([]);
  // Estado para controlar o modal de agendamento
  const [openContatoAgendar, setOpenContatoAgendar] = useState(false);
  const [isDetailedView, setIsDetailedView] = useState(false); // State to toggle view
  const [selectedRow, setSelectedRow] = useState<number | null>(null); // State to track selected row

  // Novos estados para o dropdown de seleção de Kanban
  const [selectedKanban, setSelectedKanban] = useState("KANBAN LEADS");
  const [showDropdown, setShowDropdown] = useState(false);

  // Ref e effect para fechar dropdown ao clicar fora
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [columns, setColumns] = useState<
    Record<keyof typeof columnConfig, Lead[]>
  >({
    leadsEntrada: [
      {
        id: 1,
        nome: "João Silva",
        telefone: "(11) 99999-9999",
        foto: "https://randomuser.me/api/portraits/men/1.jpg",
        origem: "whatsapp",
        tags: ["#LEAD 1", "#NOVO CLIENTE"],
        dataCriacao: new Date(),
      },
      {
        id: 2,
        nome: "Maria Souza",
        telefone: "(21) 98888-8888",
        foto: "https://randomuser.me/api/portraits/women/1.jpg",
        origem: "instagram",
        tags: ["#LEAD 2", "#POTENCIAL"],
        dataCriacao: new Date(),
      },
    ],
    decidindo: [
      {
        id: 3,
        nome: "Carlos Almeida",
        telefone: "(31) 97777-7777",
        foto: "https://randomuser.me/api/portraits/men/2.jpg",
        origem: "facebook",
        tags: ["#LEAD 3", "#DECIDINDO"],
        dataCriacao: new Date(),
      },
    ],
    emAtendimento: [
      {
        id: 4,
        nome: "Ana Paula",
        telefone: "(41) 96666-6666",
        foto: "https://randomuser.me/api/portraits/women/2.jpg",
        origem: "email",
        tags: ["#LEAD 4", "#EM ATENDIMENTO"],
        dataCriacao: new Date(),
      },
    ],
    agendados: [
      {
        id: 5,
        nome: "Rafael Santos",
        telefone: "(51) 95555-5555",
        foto: "https://randomuser.me/api/portraits/men/3.jpg",
        origem: "whatsapp",
        tags: ["#LEAD 5", "#AGENDADO"],
        dataCriacao: new Date(),
      },
    ],
    aguardandoResposta: [
      {
        id: 6,
        nome: "Fernanda Lima",
        telefone: "(61) 94444-4444",
        foto: "https://randomuser.me/api/portraits/women/3.jpg",
        origem: "instagram",
        tags: ["#LEAD 6", "#AGUARDANDO RESPOSTA"],
        dataCriacao: new Date(),
      },
    ],
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const sourceItems = Array.from(columns[sourceColumn]);
    const destItems = Array.from(columns[destColumn]);

    const [movedItem] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [sourceColumn]: sourceItems,
      [destColumn]: destItems,
    });
  };

  const handleCardClick = (lead: Lead) => {
    setOpenContatos((prev) => {
      if (!prev.some((c) => c.id === lead.id)) {
        return [...prev, lead];
      }
      return prev;
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho do Painel Kanban */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 rounded-md shadow-md w-full max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Painel Kanban</h1>
          {/* Dropdown */}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="relative bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition"
            >
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-400 text-white text-xs px-1 py-0.5 rounded">
                Seleção de Kanban
              </span>
              <span>{selectedKanban}</span>
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 z-10">
                <button
                  onClick={() => {
                    setSelectedKanban("KANBAN LEADS");
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                >
                  KANBAN LEADS
                </button>
                <button
                  onClick={() => {
                    setSelectedKanban("KANBAN VENDA");
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                >
                  KANBAN VENDA
                </button>
              </div>
            )}
          </div>
          {/* Novo Kanban moved to left */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition">
            <FaPlus />
            <span>Novo Kanban</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Pesquisar no kanban"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-12 py-2 rounded-md text-black outline-none"
          />
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-300 transition"
            onClick={() => setIsDetailedView(!isDetailedView)}
          >
            <FaThLarge />
            <span>{isDetailedView ? "Visão Kanban" : "Visão Detalhada"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow items-center p-4">
        {isDetailedView ? (
          <div className="w-full max-w-7xl overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-center">Nome</th>
                  <th className="py-2 px-4 border-b text-center">Telefone</th>
                  <th className="py-2 px-4 border-b text-center">Origem</th>
                  <th className="py-2 px-4 border-b text-center">Tags</th>
                  <th className="py-2 px-4 border-b text-center">Data de Criação</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(columns).flat().map((lead) => (
                  <tr
                    key={lead.id}
                    className={`cursor-pointer ${selectedRow === lead.id ? "bg-blue-100" : ""}`}
                    onClick={() => setSelectedRow(lead.id)}
                  >
                    <td className="py-2 px-4 border-b text-center">{lead.nome}</td>
                    <td className="py-2 px-4 border-b text-center">{lead.telefone}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex justify-center items-center">
                        {lead.origem === "whatsapp" && <FaWhatsapp style={{ color: "#25D366" }} />}
                        {lead.origem === "instagram" && <FaInstagram style={{ color: "#C13584" }} />}
                        {lead.origem === "facebook" && <FaFacebook style={{ color: "#3b5998" }} />}
                        {lead.origem === "email" && <FaEnvelope style={{ color: "#FF7300" }} />}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {lead.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {lead.dataCriacao.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl">
              {Object.entries(columns).map(([columnId, leads]) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-white rounded-lg shadow-md overflow-hidden min-h-[300px] flex flex-col"
                    >
                      {/* Cabeçalho da Coluna */}
                      <div
                        className="py-2 px-3 text-white text-sm font-medium rounded-t-lg flex justify-between items-center"
                        style={{ backgroundColor: columnConfig[columnId].color }}
                      >
                        <span>{columnConfig[columnId].name}</span>
                        <span className="text-xs bg-gray-900 px-2 py-1 rounded-full">
                          {leads.length}
                        </span>
                      </div>

                      {/* Lista de Cards */}
                      <div className="p-4 space-y-3 overflow-y-auto max-h-96">
                        {leads.map((lead: Lead, index) => {
                          const isHighlighted =
                            searchTerm.trim() !== "" &&
                            lead.nome.toLowerCase().includes(searchTerm.toLowerCase());
                          return (
                            <Draggable key={lead.id} draggableId={lead.id.toString()} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`cursor-pointer ${
                                    snapshot.isDragging
                                      ? "ring-2 ring-blue-500"
                                      : isHighlighted
                                      ? "ring-2 ring-yellow-500"
                                      : ""
                                  }`}
                                  onClick={() => handleCardClick(lead)}
                                >
                                  <KanbanCard {...lead} />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>

      {/* Renderiza um ContatoModal para cada chat aberto */}
      {openContatos.map((contato) => (
        <ContatoModal
          key={contato.id}
          contato={contato}
          onClose={() => setOpenContatos((prev) => prev.filter((c) => c.id !== contato.id))}
          onAgendar={() => {
            setOpenContatos([]);
            setOpenContatoAgendar(true);
          }}
        />
      ))}

      {openContatoAgendar && (
        <ContatoAgendar
          isOpen={openContatoAgendar}
          onClose={() => setOpenContatoAgendar(false)}
        />
      )}
    </div>
  );
};

export default Kanban;
