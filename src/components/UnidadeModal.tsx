import React, { useState } from "react";

interface UnidadeModalProps {
  unidadeSelecionada: string;
  setUnidadeSelecionada: (unidade: string) => void;
  fecharModal: () => void;
}

const unidades = [
  "AC - RIO BRANCO - AV CEARA",
  "SP - JUNDIAÍ - MAXI SHOPPING",
  "SP - JUNDIAÍ - JUNDIAÍ SHOPPING",
];

const UnidadeModal: React.FC<UnidadeModalProps> = ({
  unidadeSelecionada,
  setUnidadeSelecionada,
  fecharModal,
}) => {
  const [unidadeAtual, setUnidadeAtual] = useState(unidadeSelecionada);

  const selecionarUnidade = () => {
    setUnidadeSelecionada(unidadeAtual);
    fecharModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Selecionar Grupo:
        </h2>

        <div className="border p-4 rounded-lg mb-4 bg-gray-100">
          <p className="text-gray-700 font-medium">{unidadeAtual}</p>
          <p className="text-gray-500 text-sm">Corpóreos</p>
        </div>

        <div className="space-y-3">
          {unidades.map((unidade) => (
            <label
              key={unidade}
              className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              <input
                type="radio"
                name="unidade"
                value={unidade}
                checked={unidade === unidadeAtual}
                onChange={() => setUnidadeAtual(unidade)}
                className="form-radio text-blue-500"
              />
              <span className="text-gray-800">{unidade}</span>
            </label>
          ))}
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-400 transition"
            onClick={fecharModal}
          >
            Fechar
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={selecionarUnidade}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnidadeModal;
