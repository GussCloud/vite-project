import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import MenuLateral from "../components/MenuLateral";
import DetalhesContato from "../components/DetalhesContato"; // Novo componente

interface Lead {
  id: number;
  nome: string;
  telefone: string;
  foto: string;
}

const Kanban: React.FC = () => {
  const [selectedContato, setSelectedContato] = useState<Lead | null>(null);

  const [columns, setColumns] = useState({
    leadsEntrada: [
      { id: 1, nome: "João Silva", telefone: "(11) 99999-9999", foto: "https://randomuser.me/api/portraits/men/1.jpg" },
      { id: 2, nome: "Maria Souza", telefone: "(21) 98888-8888", foto: "https://randomuser.me/api/portraits/women/1.jpg" },
    ],
    decidindo: [
      { id: 3, nome: "Carlos Almeida", telefone: "(31) 97777-7777", foto: "https://randomuser.me/api/portraits/men/2.jpg" },
    ],
    emAtendimento: [
      { id: 4, nome: "Ana Paula", telefone: "(41) 96666-6666", foto: "https://randomuser.me/api/portraits/women/2.jpg" },
    ],
    agendados: [
      { id: 5, nome: "Rafael Santos", telefone: "(51) 95555-5555", foto: "https://randomuser.me/api/portraits/men/3.jpg" },
    ],
    aguardandoResposta: [
      { id: 6, nome: "Fernanda Lima", telefone: "(61) 94444-4444", foto: "https://randomuser.me/api/portraits/women/3.jpg" },
    ],
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = source.droppableId as keyof typeof columns;
    const destColumn = destination.droppableId as keyof typeof columns;

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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <MenuLateral />

      <div className="flex flex-col flex-grow items-center p-6">
        <h1 className="text-3xl font-light text-gray-800 mb-6">Painel Kanban</h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl">
            {Object.entries(columns).map(([columnId, leads]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white rounded-lg shadow-md overflow-hidden min-h-[300px]">
                    <div className="py-2 px-3 text-white text-sm font-medium bg-gradient-to-r from-blue-900 to-blue-500 rounded-t-lg text-center">
                      {columnId === "leadsEntrada"
                        ? "LEADS DE ENTRADA"
                        : columnId === "decidindo"
                        ? "DECIDINDO"
                        : columnId === "emAtendimento"
                        ? "EM ATENDIMENTO"
                        : columnId === "agendados"
                        ? "AGENDADOS"
                        : "AGUARDANDO RESPOSTA"}
                    </div>

                    <div className="p-4 space-y-3">
                      {leads.map((lead: Lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-gray-200 p-3 rounded-lg flex items-center shadow-sm cursor-pointer ${
                                snapshot.isDragging ? "ring-2 ring-blue-500" : ""
                              }`}
                              onClick={() => setSelectedContato(lead)} // Abre o modal ao clicar no card
                            >
                              <img src={lead.foto} alt={lead.nome} className="w-10 h-10 rounded-full mr-3" />
                              <div>
                                <p className="text-gray-800 font-medium">{lead.nome}</p>
                                <p className="text-gray-600 text-sm">{lead.telefone}</p>
                              </div>
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

      {/* Janela Flutuante de Detalhes */}
      <DetalhesContato contato={selectedContato} onClose={() => setSelectedContato(null)} />
    </div>
  );
};

export default Kanban;
