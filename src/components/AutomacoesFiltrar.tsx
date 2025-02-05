import React, { useState } from "react";

interface FiltroProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filtros: { ativa?: boolean; tipo?: string }) => void;
  onClearFilters: () => void;
}

const AutomacoesFiltrar: React.FC<FiltroProps> = ({
  isOpen,
  onClose,
  onFilter,
  onClearFilters,
}) => {
  const [ativa, setAtiva] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");

  if (!isOpen) return null; // Se a modal não estiver aberta, não renderiza nada

  const handleFilterChange = () => {
    const filtros: { ativa?: boolean; tipo?: string } = {};
    if (ativa !== "") filtros.ativa = ativa === "true";
    if (tipo !== "") filtros.tipo = tipo;

    onFilter(filtros);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Filtrar Automações</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">
            Status:
          </label>
          <select
            className="w-full border rounded-md p-2 mt-1"
            value={ativa}
            onChange={(e) => setAtiva(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Ativas</option>
            <option value="false">Inativas</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">
            Tipo:
          </label>
          <select
            className="w-full border rounded-md p-2 mt-1"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="IA">IA</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={onClearFilters}
          >
            Limpar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleFilterChange}
          >
            Filtrar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomacoesFiltrar;
