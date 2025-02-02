import React from "react";

interface AutomacaoCardProps {
  id: number;
  descricao: string;
  estatisticas: {
    enviadas: number;
  };
  ativa: boolean;
}

const AutomacaoCard: React.FC<AutomacaoCardProps> = ({
  id,
  descricao,
  estatisticas,
  ativa,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 w-full max-w-7xl mx-auto flex items-center border border-gray-200 relative h-16">
      {/* Indicador de Status */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          ativa ? "bg-green-500" : "bg-red-500"
        } rounded-l-lg`}
      />

      {/* Ícone de Automação */}
      <div className="flex items-center justify-center px-3">
        <i className="fas fa-robot text-2xl text-gray-600"></i>
      </div>

      {/* Divisor */}
      <div className="w-px bg-gray-300 h-10 mx-3"></div>

      {/* Informações da Automação */}
      <div className="flex-grow">
        <h3 className="text-base font-bold text-gray-800 flex items-center">
          #{id} - {descricao}
        </h3>
      </div>

      {/* Divisor */}
      <div className="w-px bg-gray-300 h-10 mx-3"></div>

      {/* Enviadas Hoje */}
      <span className="text-sm text-gray-700 font-semibold">
        Enviadas Hoje: {estatisticas.enviadas}
      </span>

      {/* Divisor */}
      <div className="w-px bg-gray-300 h-10 mx-3"></div>

      {/* Botões */}
      <div className="flex space-x-2">
        <button className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
          <i className="fas fa-info-circle mr-1"></i> Informações
        </button>
        <button className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition">
          <i className="fas fa-edit mr-1"></i> Editar
        </button>
      </div>
    </div>
  );
};

export default AutomacaoCard;
