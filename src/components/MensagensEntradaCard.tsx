import React from "react";

interface Mensagem {
  plataforma: string;
  icone: string;
  cor: string;
  quantidade: number;
}

interface MensagensEntradaProps {
  mensagensDeEntrada: Mensagem[];
  totalMensagens: number;
}

const MensagensEntradaCard: React.FC<MensagensEntradaProps> = ({
  mensagensDeEntrada,
  totalMensagens,
}) => {
  return (
    <div className="dashbaord-sendmessages bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Mensagens de Entrada
      </h3>
      <ul>
        {mensagensDeEntrada.map((mensagem) => {
          const porcentagem = (mensagem.quantidade / totalMensagens) * 100;
          return (
            <li key={mensagem.plataforma} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <i
                    className={`${mensagem.icone} text-lg`}
                    style={{ color: mensagem.cor }}
                  ></i>
                  <span className="text-gray-600">{mensagem.plataforma}</span>
                </div>
                <span className="font-light text-gray-600">
                  {mensagem.quantidade}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${porcentagem}%`,
                    backgroundColor: mensagem.cor,
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

export default MensagensEntradaCard;
