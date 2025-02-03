import React from "react";

// Definição das propriedades do CanalCard
interface CanalCardProps {
  nome: string;
  tipo: string;
  status: string;
}

const CanalCard: React.FC<CanalCardProps> = ({ nome, tipo, status }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{nome}</h3>
      <p className="text-gray-600 mb-2">Tipo: {tipo}</p>
      <p className="text-gray-600 mb-4">Status: {status}</p>
      {/* Aqui podem ser adicionados botões para editar, remover, etc. */}
    </div>
  );
};

export default CanalCard;
