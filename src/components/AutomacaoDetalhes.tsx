import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { Chart, registerables } from "chart.js";

// Registrar os módulos do Chart.js
Chart.register(...registerables);

interface AutomacaoDetalhesProps {
  isOpen: boolean;
  onClose: () => void;
  automacao: {
    id: number;
    descricao: string;
    estatisticas: {
      enviadas: number[];
      entregues: number[];
      respondidas: number[];
      finalizadas: number[];
    };
  };
}

const AutomacaoDetalhes: React.FC<AutomacaoDetalhesProps> = ({
  isOpen,
  onClose,
  automacao,
}) => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [filtroData, setFiltroData] = useState("Data de Envio");
  const [activeTab, setActiveTab] = useState("grafico");

  // Função para aplicar os filtros selecionados
  const handleFiltrar = () => {
    console.log("Aplicando filtros:", { dataInicio, dataFim, filtroData });
    // Aqui você pode implementar a lógica de filtragem dos dados
  };

  // Dados fake para o grid de detalhamento
  const fakeDetalhes = [
    {
      nomeCliente: "João Silva",
      telefoneCliente: "(11) 99999-8888",
      emailCliente: "joao.silva@example.com",
      dataCriacao: "2025-01-01",
      dataEnvio: "2025-01-02",
      dataEntrega: "2025-01-03",
      dataResposta: "2025-01-04",
    },
    {
      nomeCliente: "Maria Souza",
      telefoneCliente: "(11) 88888-7777",
      emailCliente: "maria.souza@example.com",
      dataCriacao: "2025-02-05",
      dataEnvio: "2025-02-06",
      dataEntrega: "2025-02-07",
      dataResposta: "2025-02-08",
    },
    {
      nomeCliente: "Carlos Pereira",
      telefoneCliente: "(11) 77777-6666",
      emailCliente: "carlos.pereira@example.com",
      dataCriacao: "2025-03-10",
      dataEnvio: "2025-03-11",
      dataEntrega: "2025-03-12",
      dataResposta: "2025-03-13",
    },
  ];

  // Referência para o canvas do gráfico
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Renderiza o gráfico apenas se a aba ativa for "grafico"
    if (activeTab !== "grafico") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Calcula os totais para cada estatística
    const totalEnviadas = automacao.estatisticas.enviadas.reduce(
      (a, b) => a + b,
      0
    );
    const totalEntregues = automacao.estatisticas.entregues.reduce(
      (a, b) => a + b,
      0
    );
    const totalRespondidas = automacao.estatisticas.respondidas.reduce(
      (a, b) => a + b,
      0
    );
    const totalFinalizadas = automacao.estatisticas.finalizadas.reduce(
      (a, b) => a + b,
      0
    );

    // Cria o gráfico de colunas
    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Enviadas", "Entregues", "Respondidas", "Finalizadas"],
        datasets: [
          {
            label: "Total",
            data: [
              totalEnviadas,
              totalEntregues,
              totalRespondidas,
              totalFinalizadas,
            ],
            backgroundColor: [
              "rgba(66, 153, 225, 0.8)", // blue-500
              "rgba(72, 187, 120, 0.8)", // green-500
              "rgba(237, 137, 54, 0.8)", // orange-500
              "rgba(229, 62, 62, 0.8)", // red-500
            ],
            borderColor: [
              "rgba(66, 153, 225, 1)",
              "rgba(72, 187, 120, 1)",
              "rgba(237, 137, 54, 1)",
              "rgba(229, 62, 62, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.parsed.y}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });

    // Destrói a instância do gráfico ao desmontar ou atualizar o efeito
    return () => {
      chartInstance.destroy();
    };
  }, [activeTab, automacao]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detalhes da Automação"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white text-lg font-semibold p-4 rounded-t-lg flex justify-between">
          <span>
            Detalhes da Automação - #{automacao.id} - {automacao.descricao}
          </span>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-lg"
          >
            ✖
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Filtros alinhados lado a lado */}
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="dataInicio" className="font-semibold">
                  Data Inicial:
                </label>
                <input
                  id="dataInicio"
                  type="date"
                  className="border border-gray-300 p-2 rounded-md"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="dataFim" className="font-semibold">
                  Data Final:
                </label>
                <input
                  id="dataFim"
                  type="date"
                  className="border border-gray-300 p-2 rounded-md"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="filtroData" className="font-semibold">
                  Tipo de Data:
                </label>
                <select
                  id="filtroData"
                  className="border border-gray-300 p-2 rounded-md"
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                >
                  <option>Data de Criação</option>
                  <option>Data de Envio</option>
                  <option>Data de Entrega</option>
                </select>
              </div>
              <button
                onClick={handleFiltrar}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Filtrar
              </button>
            </div>
          </div>

          {/* Abas internas */}
          <div className="mb-4 border-b">
            <button
              onClick={() => setActiveTab("grafico")}
              className={`py-2 px-4 ${
                activeTab === "grafico"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Gráfico
            </button>
            <button
              onClick={() => setActiveTab("detalhes")}
              className={`py-2 px-4 ${
                activeTab === "detalhes"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Detalhes
            </button>
          </div>

          {/* Container com altura fixa para evitar redimensionamento */}
          <div className="relative h-[400px]">
            {activeTab === "grafico" && (
              <div className="absolute inset-0">
                <canvas ref={canvasRef}></canvas>
              </div>
            )}

            {activeTab === "detalhes" && (
              <div className="absolute inset-0 overflow-y-auto">
                <h3 className="text-xl font-semibold mb-4">
                  Detalhamento dos Envios
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Telefone Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Criação
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Envio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Entrega
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Resposta
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fakeDetalhes.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.nomeCliente}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.telefoneCliente}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.emailCliente}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.dataCriacao}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.dataEnvio}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.dataEntrega}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.dataResposta}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AutomacaoDetalhes;
