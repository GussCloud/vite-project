import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import MenuConnect from "./MenuConnect";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

Chart.register(...registerables);

const Automacoes: React.FC = () => {
  const navigate = useNavigate();
  const tiposDeEventos = [
    "Segmentação de clientes",
    "Segmentação de LEADS",
    "Novo lead registrado",
    "Aniversariantes",
  ];

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  interface Card {
    id: number;
    descricao: string;
    tipoEvento: string;
    enviosHoje: number;
    enviosDias: number[];
    mensagens: {
      criadas: number;
      enviadas: number;
      entregues: number;
    };
    status: string;
  }

  const [cards, setCards] = useState<Card[]>([]);
  const [totalAutomacoes, setTotalAutomacoes] = useState(0);
  const [totalEnvios, setTotalEnvios] = useState(0);
  const [totalEntregues, setTotalEntregues] = useState(0);
  const [totalPendentes, setTotalPendentes] = useState(0);
  const [modalData, setModalData] = useState<Card["mensagens"] | null>(null);
  const [modalChart, setModalChart] = useState<Chart | null>(null);

  const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const gerarStatus = () => (Math.random() > 0.5 ? "Ativo" : "Inativo");

  const gerarCards = () => {
    const novosCards = [];
    let totalAutomacoesTemp = 0;
    let totalEnviosTemp = 0;
    let totalEntreguesTemp = 0;
    let totalPendentesTemp = 0;

    for (let i = 1; i <= 30; i++) {
      const id = 117 + i;
      const descricao = `Confirmação de agenda ${randomNumber(12, 48)} horas`;
      const tipoEvento =
        tiposDeEventos[randomNumber(0, tiposDeEventos.length - 1)];
      const enviosHoje = randomNumber(500, 5000);
      const enviosDias = [
        randomNumber(1000, 7000),
        randomNumber(2000, 8000),
        randomNumber(3000, 9000),
      ];
      const mensagens = {
        criadas: randomNumber(5000, 10000),
        enviadas: randomNumber(1000, 5000),
        entregues: randomNumber(1000, 5000),
      };

      novosCards.push({
        id,
        descricao,
        tipoEvento,
        enviosHoje,
        enviosDias,
        mensagens,
        status: gerarStatus(),
      });

      totalAutomacoesTemp++;
      totalEnviosTemp += enviosHoje;
      totalEntreguesTemp += mensagens.entregues;
      totalPendentesTemp += mensagens.criadas - mensagens.enviadas;
    }

    setCards(novosCards);
    setTotalAutomacoes(totalAutomacoesTemp);
    setTotalEnvios(totalEnviosTemp);
    setTotalEntregues(totalEntreguesTemp);
    setTotalPendentes(totalPendentesTemp);
  };

  useEffect(() => {
    gerarCards();
  }, []);

  useEffect(() => {
    // Configura gráficos nos cards após renderização
    cards.forEach((card) => {
      const ctx = document.getElementById(
        `chart-${card.id}`
      ) as HTMLCanvasElement;

      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["D-3", "D-2", "D-1"],
            datasets: [
              {
                label: "Envios",
                data: card.enviosDias,
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
    });
  }, [cards]);

  const abrirModal = (mensagens: Card["mensagens"]) => {
    setModalData(mensagens);

    setTimeout(() => {
      const ctx = document.getElementById("modal-chart") as HTMLCanvasElement;

      if (ctx) {
        if (modalChart) modalChart.destroy();

        setModalChart(
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Criadas", "Enviadas", "Entregues"],
              datasets: [
                {
                  label: "Mensagens",
                  data: [
                    mensagens.criadas,
                    mensagens.enviadas,
                    mensagens.entregues,
                  ],
                  backgroundColor: ["#fbbf24", "#3b82f6", "#10b981"],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: { y: { beginAtZero: true } },
            },
          })
        );
      }
    }, 100);
  };

  const fecharModal = () => {
    setModalData(null);
    if (modalChart) modalChart.destroy();
  };

  return (
    <div className="relative">
      {/* Menu Lateral */}
      <MenuConnect />

      {/* Conteúdo da Página */}
      <div className="p-6 bg-gray-100">
        <div className="bg-gradient-to-r from-blue-900 to-blue-300 text-white py-4 px-8 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-4xl font-bold">Automações</h1>
        </div>

        {/* Totalizadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Automações Ativas
            </h2>
            <p className="text-5xl font-extrabold text-blue-500">
              {totalAutomacoes}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Total de Envios
            </h2>
            <p className="text-5xl font-extrabold text-green-500">
              {totalEnvios}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Mensagens Entregues
            </h2>
            <p className="text-5xl font-extrabold text-yellow-500">
              {totalEntregues}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Mensagens a Enviar
            </h2>
            <p className="text-5xl font-extrabold text-red-500">
              {totalPendentes}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-md font-bold text-gray-800">#{card.id}</h2>
                <button
                  onClick={() => abrirModal(card.mensagens)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Ver Detalhes
                </button>
              </div>
              <p className="text-gray-600">{card.descricao}</p>
              <canvas
                id={`chart-${card.id}`}
                className="mt-4 w-full h-32" /* Define altura fixa */
                style={{ maxHeight: "128px" }} /* Para maior controle */
              ></canvas>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <button
              onClick={fecharModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">Detalhes do Evento</h2>
            <canvas id="modal-chart" width="400" height="250"></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automacoes;
