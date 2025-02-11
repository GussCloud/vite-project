import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import ContatoModal from "../components/ContatoModal";
import ContatoAgendar from "../components/ContatoAgendar";
import KanbanCard from "../components/KanbanCard";
import { FaPlus, FaThLarge } from "react-icons/fa"; // Ícones

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho do Painel Kanban */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 rounded-md shadow-md w-full max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Painel Kanban</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition">
            <FaPlus />
            <span>Novo Kanban</span>
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-300 transition">
            <FaThLarge />
            <span>Selecionar Kanban</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow items-center p-6">
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
                      {leads.map((lead: Lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`cursor-pointer ${snapshot.isDragging ? "ring-2 ring-blue-500" : ""}`}
                              onClick={() => handleCardClick(lead)}
                            >
                              <KanbanCard {...lead} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
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
