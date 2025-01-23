import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import MenuLateral from "./MenuLateral";
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

  const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const gerarStatus = () => (Math.random() > 0.5 ? "Ativo" : "Inativo");

  const gerarCards = () => {
    const novosCards = [];
    let totalAutomacoesTemp = 0;
    let totalEnviosTemp = 0;
    let totalEntreguesTemp = 0;

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
    }

    setCards(novosCards);
    setTotalAutomacoes(totalAutomacoesTemp);
    setTotalEnvios(totalEnviosTemp);
    setTotalEntregues(totalEntreguesTemp);
  };

  useEffect(() => {
    gerarCards();
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Painel de Resumo */}
          <div className="col-span-1 lg:col-span-4 bg-white rounded-lg shadow-md">
            {/* Barra Superior */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-2 px-4 rounded-t-lg">
              <h2 className="text-white font-semibold text-lg">Resumo</h2>
            </div>

            {/* Conteúdo do Painel */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 shadow-md rounded-lg p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Automações Ativas
                </h2>
                <p className="text-5xl font-extrabold text-blue-500">
                  {totalAutomacoes}
                </p>
              </div>
              <div className="bg-gray-50 shadow-md rounded-lg p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Total de Envios
                </h2>
                <p className="text-5xl font-extrabold text-green-500">
                  {totalEnvios}
                </p>
              </div>
              <div className="bg-gray-50 shadow-md rounded-lg p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Mensagens Entregues
                </h2>
                <p className="text-5xl font-extrabold text-yellow-500">
                  {totalEntregues}
                </p>
              </div>
            </div>
          </div>

          {/* Painel de Automações */}
          <div className="col-span-1 lg:col-span-4 bg-white rounded-lg shadow-md">
            {/* Barra Superior */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-2 px-4 rounded-t-lg">
              <h2 className="text-white font-semibold text-lg">Automações</h2>
            </div>

            {/* Conteúdo do Painel */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-md font-bold text-gray-800">
                      #{card.id}
                    </h2>
                    <button className="text-blue-500 hover:text-blue-700">
                      Ver Detalhes
                    </button>
                  </div>
                  <p className="text-gray-600">{card.descricao}</p>
                  <canvas
                    id={`chart-${card.id}`}
                    className="mt-4 w-full h-32"
                    style={{ maxHeight: "128px" }}
                  ></canvas>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automacoes;
