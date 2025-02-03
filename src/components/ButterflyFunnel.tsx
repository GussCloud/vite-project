import React from "react";

interface FunnelStep {
  label: string;
  color: string;
}

const ButterflyFunnel: React.FC = () => {
  // Definição das etapas do funil com cores
  const topSteps: FunnelStep[] = [
    { label: "Captura Lead Digital", color: "bg-blue-500" },
    { label: "Agendamento", color: "bg-red-300" },
    { label: "Avaliação", color: "bg-pink-300" },
    { label: "Vendas", color: "bg-green-500" },
  ];

  const bottomSteps: FunnelStep[] = [
    { label: "NPS", color: "bg-orange-300" },
    { label: "Indique Amigos", color: "bg-blue-300" },
    { label: "Revendas e Reativações", color: "bg-yellow-600" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full p-6">
      {/* Título */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Ecossistema - Elos
      </h2>

      {/* Funil */}
      <div className="flex flex-col items-center relative">
        {/* Parte Superior (Entrada) */}
        {topSteps.map((step, index) => (
          <div
            key={index}
            className={`w-${index + 2}/6 ${
              step.color
            } text-white text-center py-2 rounded-lg shadow-md my-1`}
          >
            {step.label}
          </div>
        ))}

        {/* Meio (Conexão) */}
        <div className="w-16 h-16 bg-green-500 text-white text-center font-bold flex items-center justify-center rounded-full shadow-lg my-2">
          Vendas
        </div>

        {/* Parte Inferior (Saída) */}
        {bottomSteps.map((step, index) => (
          <div
            key={index}
            className={`w-${bottomSteps.length - index}/6 ${
              step.color
            } text-white text-center py-2 rounded-lg shadow-md my-1`}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButterflyFunnel;
