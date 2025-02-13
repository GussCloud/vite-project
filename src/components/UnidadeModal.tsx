import React, { useState } from "react";

interface UnidadeModalProps {
  unidadeSelecionada: string;
  setUnidadeSelecionada: (unidade: string) => void;
  fecharModal: () => void;
}

const unidadesHierarquia = [
  {
    grupo: "GRUPO ESPAÇO LASER",
    subgrupos: [
      {
        titulo: "LOJAS PROPRIAS",
        unidades: ["AC - RIO BRANCO - AV CEARA", "SP - JUNDIAÍ - MAXI SHOPPING"],
      },
      {
        titulo: "FRANQUIAS",
        unidades: ["SP - JUNDIAÍ - JUNDIAÍ SHOPPING", "SP - JUNDIAÍ - OUTRA UNIDADE"],
      },
    ],
  },
];

const UnidadeModal: React.FC<UnidadeModalProps> = ({
  unidadeSelecionada,
  setUnidadeSelecionada,
  fecharModal,
}) => {
  const [unidadeAtual, setUnidadeAtual] = useState(unidadeSelecionada);
  const [searchTerm, setSearchTerm] = useState("");
  // Controla a expansão dos subgrupos individualmente
  const [expandedSubgrupos, setExpandedSubgrupos] = useState<{ [titulo: string]: boolean }>(() => {
    const initial: { [titulo: string]: boolean } = {};
    unidadesHierarquia[0].subgrupos.forEach((sub) => {
      initial[sub.titulo] = true; // Por padrão, todos abertos
    });
    return initial;
  });

  const toggleSubgrupo = (titulo: string) => {
    setExpandedSubgrupos((prev) => ({
      ...prev,
      [titulo]: !prev[titulo],
    }));
  };

  // Filtra as unidades com base no termo de pesquisa (case insensitive)
  const filteredUnidades = (unidades: string[]) =>
    unidades.filter((unidade) =>
      unidade.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const selecionarUnidade = () => {
    setUnidadeSelecionada(unidadeAtual);
    fecharModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal com tamanho limitado; o scroll é aplicado apenas no painel de unidades */}
      <div className="bg-white rounded-lg shadow-lg p-1 w-full max-w-md max-h-[80vh]">
        {/* Header com Gradiente Azul */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white p-3 rounded-lg mb-4">
          <h2 className="text-xl font-bold">Selecione a Unidade</h2>
        </div>

        {/* Painel: Unidade Atual */}
        <div className="border rounded-lg bg-gray-100 mb-4 p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Unidade Atual</h3>
          <p className="text-gray-700">{unidadeAtual}</p>
        </div>

        {/* Campo de Pesquisa */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar unidade..."
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Painel: Selecionar nova unidade com scroll interno */}
        <div className="modal-scroll border rounded-lg bg-gray-100 mb-4 p-4 max-h-[40vh] overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Selecionar nova unidade</h3>
          {unidadesHierarquia.map((grupo) => (
            <div key={grupo.grupo} className="mb-4">
              {grupo.subgrupos.map((subgrupo) => (
                <div key={subgrupo.titulo} className="mb-3">
                  {/* Cabeçalho do Subgrupo com fundo cinza escuro e cantos arredondados */}
                  <div
                    className="flex justify-between items-center bg-gray-300 rounded-lg p-2 mb-1 cursor-pointer"
                    onClick={() => toggleSubgrupo(subgrupo.titulo)}
                  >
                    <h4 className="font-semibold text-gray-800">{subgrupo.titulo}</h4>
                    <span className="text-gray-700">
                      {expandedSubgrupos[subgrupo.titulo] ? "▲" : "▼"}
                    </span>
                  </div>
                  {expandedSubgrupos[subgrupo.titulo] && (
                    <ul className="mt-2 space-y-1">
                      {/* Opção para selecionar todo o grupo */}
                      <li>
                        <label className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 transition">
                          <input
                            type="radio"
                            name="unidade"
                            value={subgrupo.titulo}
                            checked={unidadeAtual === subgrupo.titulo}
                            onChange={() => setUnidadeAtual(subgrupo.titulo)}
                            className="form-radio text-blue-500 rounded-full"
                          />
                          <span className="text-gray-800">{subgrupo.titulo}</span>
                        </label>
                      </li>
                      {/* Lista de unidades individuais */}
                      {filteredUnidades(subgrupo.unidades).map((unidade) => (
                        <li key={unidade}>
                          <label className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-200 transition">
                            <input
                              type="radio"
                              name="unidade"
                              value={unidade}
                              checked={unidadeAtual === unidade}
                              onChange={() => setUnidadeAtual(unidade)}
                              className="form-radio text-blue-500 rounded-full"
                            />
                            <span className="text-gray-800">{unidade}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={fecharModal}
            className="bg-gray-300 px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-400 transition"
          >
            Fechar
          </button>
          <button
            onClick={selecionarUnidade}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnidadeModal;
