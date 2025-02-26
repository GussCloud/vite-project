import React from "react";

const CampaignMediaNotasCard: React.FC = () => {
  return (
    <div className="relative bg-white rounded-lg shadow p-4">
      {/* Fio vermelho no canto esquerdo */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500 rounded-l-lg"></div>
      <h2 className="text-lg font-semibold mb-2">Resumo geral</h2>
      <p>Envios de Hoje : Numero fake</p>
      <p>Campanhas NPS ativas : Valor fake</p>
    </div>
  );
};

export default CampaignMediaNotasCard;
