import React from "react";

interface TotalEnviosProps {
  envioHoje: number;
  enviosPorCanal: {
    plataforma: string;
    icone: string;
    cor: string;
    quantidade: number;
  }[];
}

const TotalEnviosCard: React.FC<TotalEnviosProps> = ({
  envioHoje,
  enviosPorCanal,
}) => {
  return (
    <div className="dashbaord-totalsend bg-gray-50 shadow-md rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Total de Envios Hoje
      </h2>
      <p className="text-5xl font-extrabold text-blue-500">{envioHoje}</p>
      <div className="mt-4 space-y-4 text-left">
        {enviosPorCanal.map((canal) => {
          const porcentagem = (canal.quantidade / envioHoje) * 100;
          return (
            <div key={canal.plataforma}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <i
                    className={`${canal.icone} text-lg`}
                    style={{ color: canal.cor }}
                  ></i>
                  <span className="text-gray-700 text-sm">
                    {canal.plataforma}
                  </span>
                </div>
                <span className="text-gray-700 text-sm">
                  {canal.quantidade}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${porcentagem}%`,
                    backgroundColor: canal.cor,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TotalEnviosCard;
