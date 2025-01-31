import React from "react";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  titulo: string;
  leads: { id: string; nome: string; telefone: string; foto: string }[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ titulo, leads }) => {
  return (
    <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{titulo}</h2>

      <div className="space-y-4">
        {leads.map((lead) => (
          <KanbanCard key={lead.id} {...lead} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
