import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  columnId: string;
  leads: {
    id: number;
    nome: string;
    telefone: string;
    foto: string;
    origem: "whatsapp" | "instagram" | "facebook" | "email";
    tags: string[];
    dataCriacao: Date;
  }[];
  onCardClick: (lead: {
    id: number;
    nome: string;
    telefone: string;
    foto: string;
    origem: "whatsapp" | "instagram" | "facebook" | "email";
    tags: string[];
    dataCriacao: Date;
  }) => void;
}

// **✅ Cores e nomes corrigidos**
const columnColors: Record<string, string> = {
  leadsEntrada: "#2346b8",
  decidindo: "#5828a6",
  emAtendimento: "#269653",
  agendados: "#b8ae27",
  aguardandoResposta: "#a82741",
};

const columnTitles: Record<string, string> = {
  leadsEntrada: "LEADS DE ENTRADA",
  decidindo: "DECIDINDO",
  emAtendimento: "EM ATENDIMENTO",
  agendados: "AGENDADOS",
  aguardandoResposta: "AGUARDANDO RESPOSTA",
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  columnId,
  leads,
  onCardClick,
}) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-white rounded-lg shadow-md overflow-hidden min-h-[300px] flex flex-col"
        >
          {/* ✅ Cabeçalho da Coluna Corrigido */}
          <div
            className="py-2 px-3 text-white text-sm font-medium rounded-t-lg flex justify-between items-center"
            style={{ backgroundColor: columnColors[columnId] }}
          >
            <span>{columnTitles[columnId] || "SEM TÍTULO"}</span>
            <span className="text-xs bg-gray-900 px-2 py-1 rounded-full">
              {leads.length}
            </span>
          </div>

          {/* ✅ Cards com Scroll */}
          <div className="p-4 space-y-3 overflow-y-auto max-h-96">
            {leads.map((lead, index) => (
              <Draggable
                key={lead.id}
                draggableId={lead.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`cursor-pointer ${
                      snapshot.isDragging ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => onCardClick(lead)}
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
  );
};

export default KanbanColumn;
