import React from "react";

interface SmartTagCardProps {
  id: number;
  tag: string;
  descricao: string;
  cor: string;
  condicaoSe?: string;
  condicaoEntao?: string;
  onEdit: (data: {
    tag: string;
    cor: string;
    descricao: string;
    condicaoSe?: string;
    condicaoEntao?: string;
  }) => void;
}

const SmartTagCard: React.FC<SmartTagCardProps> = ({
  tag,
  descricao,
  cor,
  condicaoSe,
  condicaoEntao,
  onEdit,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 w-full max-w-7xl mx-auto flex items-center border border-gray-200 relative h-16">
      {/* Indicador lateral com a cor da tag */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 rounded-l-lg"
        style={{ backgroundColor: cor }}
      />

      {/* Ícone de Tag */}
      <div className="flex items-center justify-center px-4 w-12">
        <i className="fas fa-tag text-3xl" style={{ color: cor }}></i>
      </div>

      {/* Divisor Vertical */}
      <div className="w-px bg-gray-300 h-12 mx-4"></div>

      {/* Informações da Smart Tag */}
      <div className="flex flex-col w-[300px] truncate">
        <h3 className="text-base font-bold text-gray-800">{tag}</h3>
        <span className="text-xs text-gray-600 mt-1">{descricao}</span>
      </div>

      {/* Divisor Vertical */}
      <div className="w-px bg-gray-300 h-12 mx-4"></div>

      {/* Condição SE e ENTÃO */}
      <div className="flex flex-col">
        {condicaoSe && (
          <span className="text-sm text-gray-700">
            <strong>SE:</strong> {condicaoSe}
          </span>
        )}
        {condicaoEntao && (
          <span className="text-sm text-gray-700">
            <strong>ENTÃO:</strong> {condicaoEntao}
          </span>
        )}
      </div>

      {/* Espaço Flex para alinhar ações à direita */}
      <div className="ml-auto flex space-x-3">
        <button
          onClick={() =>
            onEdit({
              tag,
              cor,
              descricao,
              condicaoSe,
              condicaoEntao,
            })
          }
          className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition h-10 flex items-center"
        >
          <i className="fas fa-edit mr-2"></i> Editar
        </button>
      </div>
    </div>
  );
};

export default SmartTagCard;
