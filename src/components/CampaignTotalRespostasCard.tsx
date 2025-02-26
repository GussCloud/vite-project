import React from "react";

const CampaignTotalRespostasCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 lg:col-span-2">
      {/* Título centralizado */}
      <h2 className="text-lg font-semibold mb-4 text-center">Ultimas respostas</h2>

      {/* Lista de cards de resposta empilhados verticalmente */}
      <div className="flex flex-col space-y-4">
        {/* Card de resposta */}
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
          {/* Foto do cliente */}
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Cliente"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="flex-1">
            {/* Nome da pesquisa (centralizado) */}
            <h3 className="text-center font-semibold">Pesquisa - Campanha Black</h3>
            {/* Resposta e nota */}
            <p className="text-center">Resposta: Gostei muito</p>
            <p className="text-center">Nota: 8</p>
          </div>
        </div>

        {/* Outro card de resposta */}
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
          <img
            src="https://randomuser.me/api/portraits/women/2.jpg"
            alt="Cliente"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="flex-1">
            <h3 className="text-center font-semibold">Pesquisa - Campanha White</h3>
            <p className="text-center">Resposta: Regular</p>
            <p className="text-center">Nota: 5</p>
          </div>
        </div>
        {/* ...adicionar mais cards conforme necessário... */}
      </div>
    </div>
  );
};

export default CampaignTotalRespostasCard;
