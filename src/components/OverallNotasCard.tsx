import React from "react";

const OverallNotasCard: React.FC = () => {
  // Dados fake para 4 campanhas
  const campaigns = [
    { name: "Campanha Alpha", quantity: 30, total: 100, color: "#FF5733" },
    { name: "Campanha Beta", quantity: 50, total: 100, color: "#33DBFF" },
    { name: "Campanha Gamma", quantity: 70, total: 100, color: "#85FF33" },
    { name: "Campanha Delta", quantity: 90, total: 100, color: "#FF33E3" },
  ];

  return (
    <div className="relative bg-white rounded-lg shadow p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Campanhas</h2>
      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const percentage = (campaign.quantity / campaign.total) * 100;
          return (
            <div key={campaign.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-bullseye text-lg" style={{ color: campaign.color }}></i>
                  <span className="text-gray-700 text-sm">{campaign.name}</span>
                </div>
                <span className="text-gray-700 text-sm">
                  {campaign.quantity}/{campaign.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${percentage}%`, backgroundColor: campaign.color }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverallNotasCard;
