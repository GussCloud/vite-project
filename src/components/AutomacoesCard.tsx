import React from "react";

interface Automacao {
  tipo: string;
  quantidade: number;
  icone: string;
  cor: string;
}

interface AutomacoesProps {
  automacoesPorTipo: Automacao[];
}

const AutomacoesCard: React.FC<AutomacoesProps> = ({ automacoesPorTipo }) => {
  return (
    <div className="dashbaord-infotypes bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Dados de Automações por Tipo
      </h3>
      <ul>
        {automacoesPorTipo.map((automacao) => {
          const porcentagem = (automacao.quantidade / 200) * 100;
          return (
            <li key={automacao.tipo} className="mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <i className={`${automacao.icone} text-lg text-gray-700`} />
                <span className="text-gray-700 text-sm">{automacao.tipo}</span>
                <span className="ml-auto text-gray-700 text-sm">
                  {automacao.quantidade}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${porcentagem}%`,
                    backgroundColor: automacao.cor,
                  }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AutomacoesCard;
