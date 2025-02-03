import React, { useState } from "react";
import AutomacaoDetalhes from "./AutomacaoDetalhes";

interface AutomacaoCardProps {
  id: number;
  descricao: string;
  detalhes: string;
  estatisticas: {
    enviadas: number[];
    entregues: number[];
    respondidas: number[];
    finalizadas: number[];
  };
  ativa: boolean;
  tipo: string;
}

const AutomacaoCard: React.FC<AutomacaoCardProps> = ({
  id,
  descricao,
  detalhes,
  estatisticas,
  ativa,
  tipo,
}) => {
  const [modalAberta, setModalAberta] = useState(false);

  // Define as classes do badge com base no tipo da automação
  const badgeClasses =
    tipo === "IA" ? "bg-purple-500 text-white" : "bg-gray-300 text-black";

  // Define o texto do badge com base no tipo da automação
  const badgeText = tipo === "IA" ? "Criado por I.A" : "Criado Manualmente";

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-3 w-full max-w-7xl mx-auto flex items-center border border-gray-200 relative h-20">
        {/* Indicador de Status */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-2 ${
            ativa ? "bg-green-500" : "bg-red-500"
          } rounded-l-lg`}
        />

        {/* Ícone de Automação */}
        <div className="flex items-center justify-center px-4 w-12">
          <i className="fas fa-robot text-3xl text-gray-600"></i>
        </div>

        {/* Divisor Vertical */}
        <div className="w-px bg-gray-300 h-12 mx-4"></div>

        {/* Informações da Automação: ID + Descrição e Tipo */}
        <div className="flex flex-col w-[300px] truncate">
          <h3 className="text-base font-bold text-gray-800">
            #{id} - {descricao}
          </h3>
          <span
            className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${badgeClasses}`}
          >
            {badgeText}
          </span>
        </div>

        {/* Divisor Vertical */}
        <div className="w-px bg-gray-300 h-12 mx-4"></div>

        {/* Nova Informação: Detalhes */}
        <p className="text-sm text-gray-600 w-[200px]">{detalhes}</p>

        {/* Divisor Vertical */}
        <div className="w-px bg-gray-300 h-12 mx-4"></div>

        {/* Enviadas Hoje */}
        <span className="text-sm text-gray-700 font-semibold w-32 text-center">
          Enviadas Hoje: {estatisticas.enviadas}
        </span>

        {/* Divisor Vertical */}
        <div className="w-px bg-gray-300 h-12 mx-4"></div>

        {/* Botões - Alinhados à Direita */}
        <div className="flex space-x-3 ml-auto">
          <button
            onClick={() => setModalAberta(true)}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition h-10 flex items-center"
          >
            <i className="fas fa-info-circle mr-2"></i> Informações
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition h-10 flex items-center">
            <i className="fas fa-edit mr-2"></i> Editar
          </button>
        </div>
      </div>

      {/* Modal de Detalhes */}
      <AutomacaoDetalhes
        isOpen={modalAberta}
        onClose={() => setModalAberta(false)}
        automacao={{ id, descricao, estatisticas }}
      />
    </>
  );
};

export default AutomacaoCard;
