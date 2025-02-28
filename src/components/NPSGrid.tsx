import React, { useState } from "react";

interface Campaign {
  id: number;
  name: string;
  totalEnviados: number;
  totalRespostas: number;
  nota: number;
}

const campaigns: Campaign[] = [
  { id: 1, name: "Campanha A", totalEnviados: 1000, totalRespostas: 200, nota: 8.5 },
  { id: 2, name: "Campanha B", totalEnviados: 1200, totalRespostas: 300, nota: 9.0 },
  { id: 3, name: "Campanha C", totalEnviados: 800, totalRespostas: 150, nota: 7.5 },
];

const NPSGrid: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-auto mt-8">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
          <tr>
            <th className="py-2 px-4 border-b text-center">Campanha</th>
            <th className="py-2 px-4 border-b text-center">Enviados</th>
            <th className="py-2 px-4 border-b text-center">Respostas</th>
            <th className="py-2 px-4 border-b text-center">Nota</th>
            <th className="py-2 px-4 border-b text-center">Opções</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="text-center border-b relative">
              <td className="py-2 px-4">{campaign.name}</td>
              <td className="py-2 px-4">{campaign.totalEnviados}</td>
              <td className="py-2 px-4">{campaign.totalRespostas}</td>
              <td className="py-2 px-4">{campaign.nota}</td>
              <td className="py-2 px-4">
                <div className="relative inline-block">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === campaign.id ? null : campaign.id)
                    }
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    {/* Icon representing options */}
                    &#8942;
                  </button>
                  {openDropdown === campaign.id && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Tracking</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Enviar para atendimento</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Dados do Lead/Cliente</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NPSGrid;
