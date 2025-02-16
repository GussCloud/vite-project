import React from "react";

interface Funil {
  etapa: string;
  valor: number;
}

interface FunilLeadsProps {
  funilLeads: Funil[];
  maxFunilValue: number;
  maxWidthPx: number;
}

const FunilLeadsCard: React.FC<FunilLeadsProps> = ({
  funilLeads,
  maxFunilValue,
  maxWidthPx,
}) => {
  return (
    <div className="dashboard-leadfunnil bg-white shadow-md rounded-lg p-6 col-span-1">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Funil de LEADS
      </h3>
      <div className="space-y-6">
        {funilLeads.map((fase) => {
          const widthPx =
            (Math.log(fase.valor) / Math.log(maxFunilValue)) * maxWidthPx;
          return (
            <div key={fase.etapa}>
              <p className="text-center font-semibold text-gray-700 mb-1">
                {fase.etapa}
              </p>
              <div className="flex justify-center">
                <div
                  className="bg-blue-500 rounded-full h-8 flex items-center justify-center"
                  style={{ width: `${widthPx}px` }}
                >
                  <span className="text-white font-bold text-sm">
                    {fase.valor}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunilLeadsCard;
