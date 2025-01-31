import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import MenuLateral from "./MenuLateral";

Chart.register(...registerables);

interface Automacao {
  id: number;
  descricao: string;
  detalhes: string;
  estatisticas: {
    enviadas: number;
    entregues: number;
    respondidas: number;
    finalizadas: number;
    grafico: number[];
  };
}

const Automacoes: React.FC = () => {
  const [automacoes, setAutomacoes] = useState<Automacao[]>([]);
  const [automacaoSelecionada, setAutomacaoSelecionada] = useState<
    Automacao | null
  >(null);
  const chartRef = useRef<Chart | null>(null); // Referência para o gráfico

  // Dados fake para as automações
  useEffect(() => {
    const dadosFake: Automacao[] = [
      {
        id: 1,
        descricao: "Confirmação de agendamento",
        detalhes:
          "Esta automação envia confirmações para clientes que agendaram um serviço.",
        estatisticas: {
          enviadas: 150,
          entregues: 140,
          respondidas: 85,
          finalizadas: 70,
          grafico: [25, 40, 50, 70, 90, 120],
        },
      },
      {
        id: 2,
        descricao: "Segmentação de leads",
        detalhes:
          "Automação para segmentar leads com base em interesses específicos.",
        estatisticas: {
          enviadas: 300,
          entregues: 280,
          respondidas: 220,
          finalizadas: 180,
          grafico: [50, 70, 100, 150, 200, 250],
        },
      },
      {
        id: 3,
        descricao: "Aniversariantes do mês",
        detalhes:
          "Envia notificações de aniversário para clientes cadastrados.",
        estatisticas: {
          enviadas: 400,
          entregues: 380,
          respondidas: 320,
          finalizadas: 300,
          grafico: [60, 80, 120, 200, 300, 350],
        },
      },
      {
        id: 4,
        descricao: "Follow-up de vendas",
        detalhes:
          "Automação para acompanhar vendas pendentes com lembretes automáticos.",
        estatisticas: {
          enviadas: 200,
          entregues: 190,
          respondidas: 150,
          finalizadas: 130,
          grafico: [30, 50, 90, 120, 150, 190],
        },
      },
    ];
    setAutomacoes(dadosFake);
  }, []);

  const selecionarAutomacao = (automacao: Automacao) => {
    setAutomacaoSelecionada(automacao);

    // Atualiza o gráfico
    setTimeout(() => {
      const ctx = document.getElementById(
        "automacao-chart"
      ) as HTMLCanvasElement;

      if (ctx) {
        // Destroi o gráfico anterior, se existir
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Cria um novo gráfico
        chartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["D-6", "D-5", "D-4", "D-3", "D-2", "D-1"],
            datasets: [
              {
                label: "Atividades",
                data: automacao.estatisticas.grafico,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false } },
          },
        });
      }
    }, 100);
  };

  useEffect(() => {
    // Limpa o gráfico ao desmontar o componente
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex">
      {/* Menu Lateral */}
      <MenuLateral />

      {/* Conteúdo Principal */}
      <div className="flex-grow p-6 bg-gray-100 overflow-auto">
        {/* Título */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-light text-gray-800">Automações</h1>
        </div>

        {/* Painel Principal */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Coluna da Esquerda: Lista de Automações */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Lista de Automações
            </h2>
            <div className="space-y-4">
              {automacoes.map((automacao) => (
                <div
                  key={automacao.id}
                  onClick={() => selecionarAutomacao(automacao)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    automacaoSelecionada?.id === automacao.id
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <h3 className="text-md font-bold text-gray-800">
                    #{automacao.id}
                  </h3>
                  <p className="text-sm text-gray-600">{automacao.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna da Direita: Detalhes da Automação */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Detalhes da Automação
            </h2>
            {automacaoSelecionada ? (
              <div>
                <h3 className="text-md font-bold text-gray-800 mb-4">
                  {automacaoSelecionada.descricao}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {automacaoSelecionada.detalhes}
                </p>

                {/* Estatísticas */}
                <ul className="grid grid-cols-2 gap-4 mb-6">
                  <li className="bg-blue-100 p-4 rounded-lg text-center">
                    <h4 className="text-md font-bold text-gray-800">Enviadas</h4>
                    <p className="text-lg font-light text-gray-600">
                      {automacaoSelecionada.estatisticas.enviadas}
                    </p>
                  </li>
                  <li className="bg-green-100 p-4 rounded-lg text-center">
                    <h4 className="text-md font-bold text-gray-800">
                      Entregues
                    </h4>
                    <p className="text-lg font-light text-gray-600">
                      {automacaoSelecionada.estatisticas.entregues}
                    </p>
                  </li>
                  <li className="bg-yellow-100 p-4 rounded-lg text-center">
                    <h4 className="text-md font-bold text-gray-800">
                      Respondidas
                    </h4>
                    <p className="text-lg font-light text-gray-600">
                      {automacaoSelecionada.estatisticas.respondidas}
                    </p>
                  </li>
                  <li className="bg-red-100 p-4 rounded-lg text-center">
                    <h4 className="text-md font-bold text-gray-800">
                      Finalizadas
                    </h4>
                    <p className="text-lg font-light text-gray-600">
                      {automacaoSelecionada.estatisticas.finalizadas}
                    </p>
                  </li>
                </ul>

                {/* Gráfico */}
                <div className="h-64">
                  <canvas id="automacao-chart"></canvas>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Selecione uma automação.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automacoes;
