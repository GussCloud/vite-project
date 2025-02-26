import React from "react";

const CampaignTotalEnviadosCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Título centralizado com ícone de tip */}
      <h2 className="text-lg font-semibold mb-4 text-center">
        Média Geral
        <span
          title="Este card mostra a média geral baseado em todas as pesquisas NPS ja realizadas"
          className="ml-2 inline-block text-sm text-blue-500 cursor-pointer rounded-full border border-blue-500 w-4 h-4 flex items-center justify-center"
        >
          i
        </span>
      </h2>

      {/* Semi Circle Gauge */}
      <div className="flex justify-center">
        <svg viewBox="0 0 100 60" className="mx-auto">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="red" />
              <stop offset="100%" stopColor="green" />
            </linearGradient>
          </defs>
          {/* Arco do gauge: semicircular de 180° */}
          <path d="M10,50 A40,40 0 0,1 90,50" stroke="url(#gaugeGradient)" strokeWidth="8" fill="none" />
          {/* Marcador para valor 7,5 (45° no arco) */}
          <circle cx="78.3" cy="21.7" r="3" fill="black" />
        </svg>
      </div>

      {/* Valor da média */}
      <p className="text-center font-bold mt-4 text-2xl">7,5</p>
    </div>
  );
};

export default CampaignTotalEnviadosCard;
