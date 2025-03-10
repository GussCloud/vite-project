import React, { useState, useEffect } from "react";
import AutomacaoCard from "../components/AutomacaoCard";
import NovaAutomacao from "../components/NovaAutomacao";
import AutomacoesFiltrar from "../components/AutomacoesFiltrar";

interface Automacao {
  id: number;
  descricao: string;
  detalhes: string;
  estatisticas: {
    enviadas: number[];
    entregues: number[];
    respondidas: number[];
    finalizadas: number[];
  };
  ativa: boolean;
  tipo: string;
}

const Automacoes: React.FC = () => {
  const [automacoes, setAutomacoes] = useState<Automacao[]>([]);
  const [isNovaAutomacaoOpen, setIsNovaAutomacaoOpen] = useState(false);
  const [isFiltroOpen, setIsFiltroOpen] = useState(false);
  const [filtros, setFiltros] = useState<{ ativa?: boolean; tipo?: string }>(
    {}
  );

  // Simulação de dados (fake)
  useEffect(() => {
    const dadosFake: Automacao[] = [
      {
        id: 1,
        descricao: "Confirmação de agendamento",
        detalhes: "CONFIRMAÇÂO DE AGENDAMENTO 24H ANTES",
        estatisticas: {
          enviadas: [150],
          entregues: [140],
          respondidas: [85],
          finalizadas: [70],
        },
        ativa: true,
        tipo: "IA",
      },
      {
        id: 2,
        descricao: "Segmentação de leads",
        detalhes: "LEAD REGISTRADO PELA LP BEM VINDO",
        estatisticas: {
          enviadas: [300],
          entregues: [280],
          respondidas: [220],
          finalizadas: [180],
        },
        ativa: false,
        tipo: "Manual",
      },
      {
        id: 3,
        descricao: "Aniversariantes do mês",
        detalhes: "ENVIO DE PARABÉNS PARA CLIENTES ANIVERSARIANTES",
        estatisticas: {
          enviadas: [400],
          entregues: [380],
          respondidas: [320],
          finalizadas: [300],
        },
        ativa: true,
        tipo: "Manual",
      },
      {
        id: 4,
        descricao: "Segmentação de Clientes",
        detalhes:
          "CLIENTES COM COMPRA DE LASER SEM SESSÃO NOS ULTIMOS 45 DIAS.",
        estatisticas: {
          enviadas: [654],
          entregues: [380],
          respondidas: [320],
          finalizadas: [300],
        },
        ativa: true,
        tipo: "IA",
      },
    ];
    setAutomacoes(dadosFake);
  }, []);

  // Aplica os filtros antes de exibir
  const automacoesFiltradas = automacoes.filter((automacao) => {
    return (
      (filtros.ativa === undefined || automacao.ativa === filtros.ativa) &&
      (filtros.tipo === undefined || automacao.tipo === filtros.tipo)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex flex-col flex-grow items-center">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white w-full max-w-7xl rounded-lg shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Automações</h1>

          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md flex items-center"
              onClick={() => setIsFiltroOpen(true)}
            >
              <i className="fas fa-filter mr-2"></i> Filtrar
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md flex items-center"
              onClick={() => setIsNovaAutomacaoOpen(true)}
            >
              <i className="fas fa-plus-circle mr-2"></i> Nova Automação
            </button>
          </div>
        </div>

        {/* Lista de Automações Filtradas */}
        <div className="w-full max-w-7xl mt-6 space-y-4">
          {automacoesFiltradas.map((automacao) => (
            <AutomacaoCard key={automacao.id} {...automacao} />
          ))}
        </div>
      </div>

      {/* Modal de Filtros */}
      <AutomacoesFiltrar
        isOpen={isFiltroOpen}
        onClose={() => setIsFiltroOpen(false)}
        onFilter={(filtros) => {
          setFiltros(filtros);
          setIsFiltroOpen(false);
        }}
        onClearFilters={() => {
          setFiltros({});
          setIsFiltroOpen(false);
        }}
      />

      {/* Componente NovaAutomacao */}
      <NovaAutomacao
        isOpen={isNovaAutomacaoOpen}
        onClose={() => setIsNovaAutomacaoOpen(false)}
      />
    </div>
  );
};

export default Automacoes;
