import React from "react";

interface KanbanCardProps {
  id: string;
  nome: string;
  telefone: string;
  foto: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ nome, telefone, foto }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      {/* Foto do Lead */}
      <img src={foto} alt={nome} className="w-12 h-12 rounded-full object-cover" />
      
      {/* Informações do Lead */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{nome}</h3>
        <p className="text-gray-600 text-sm">{telefone}</p>
      </div>
    </div>
  );
};

export default KanbanCard;
