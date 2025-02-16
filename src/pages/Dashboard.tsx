import React, { useState } from "react";
import GuidedTourDashboard from "../components/GuidedTourDashboard";
import TotalEnviosCard from "../components/TotalEnviosCard";
import AutomacoesCard from "../components/AutomacoesCard";
import MensagensEntradaCard from "../components/MensagensEntradaCard";
import FontesLeadCard from "../components/FontesLeadCard";
import FunilLeadsCard from "../components/FunilLeadsCard";

const Dashboard: React.FC = () => {
  const envioHoje = 3456;

  const mensagensDeEntrada = [
    {
      plataforma: "Whatsapp",
      icone: "fab fa-whatsapp",
      cor: "#25D366",
      quantidade: 1000,
    },
    {
      plataforma: "Instagram",
      icone: "fab fa-instagram",
      cor: "#E1306C",
      quantidade: 540,
    },
    {
      plataforma: "Messenger",
      icone: "fab fa-facebook-messenger",
      cor: "#0084FF",
      quantidade: 234,
    },
    {
      plataforma: "Telegram",
      icone: "fab fa-telegram",
      cor: "#0088CC",
      quantidade: 98,
    },
  ];
  const totalMensagens = mensagensDeEntrada.reduce(
    (total, m) => total + m.quantidade,
    0
  );

  const enviosPorCanal = [
    {
      plataforma: "WhatsApp",
      icone: "fab fa-whatsapp",
      cor: "#25D366",
      quantidade: 1543,
    },
    {
      plataforma: "Instagram",
      icone: "fab fa-instagram",
      cor: "#E1306C",
      quantidade: 543,
    },
    {
      plataforma: "Messenger",
      icone: "fab fa-facebook-messenger",
      cor: "#0084FF",
      quantidade: 200,
    },
    {
      plataforma: "Telegram",
      icone: "fab fa-telegram",
      cor: "#0088CC",
      quantidade: 187,
    },
  ];

  const fontesLeadData = {
    labels: ["WhatsApp", "Instagram", "Messenger", "Telegram"],
    datasets: [
      {
        data: [987, 822, 655, 356],
        backgroundColor: ["#25D366", "#E1306C", "#0084FF", "#0088CC"],
        hoverBackgroundColor: ["#1B9D5D", "#C6245C", "#0054A1", "#007B8C"],
      },
    ],
  };

  const automacoesPorTipo = [
    {
      tipo: "Confirmação de Agendamento",
      quantidade: 37,
      icone: "fas fa-calendar-check",
      cor: "#3b82f6",
    },
    {
      tipo: "Aniversariantes",
      quantidade: 142,
      icone: "fas fa-cake",
      cor: "#facc15",
    },
    {
      tipo: "Vendas via BOT",
      quantidade: 8,
      icone: "fas fa-shopping-cart",
      cor: "#10b981",
    },
  ];

  const funilLeads = [
    { etapa: "Cadastrados", valor: 3000 },
    { etapa: "Agendados", valor: 200 },
    { etapa: "Qualificados", valor: 50 },
    { etapa: "Vendas realizadas", valor: 7 },
  ];
  const maxFunilValue = funilLeads[0].valor;
  const maxWidthPx = 300;

  const [runTour, setRunTour] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {runTour && <GuidedTourDashboard />}
      <div className="flex flex-col flex-grow">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white w-full max-w-7xl rounded-lg shadow-md p-4 mx-auto mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button
            onClick={() => setRunTour(true)}
            className="text-white hover:text-gray-200 transition"
            title="Iniciar Tour"
          >
            <i className="fas fa-question-circle text-2xl"></i>
          </button>
        </div>
        <div className="dashbaord-cards overflow-auto flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <TotalEnviosCard
              envioHoje={envioHoje}
              enviosPorCanal={enviosPorCanal}
            />
            <AutomacoesCard automacoesPorTipo={automacoesPorTipo} />
            <MensagensEntradaCard
              mensagensDeEntrada={mensagensDeEntrada}
              totalMensagens={totalMensagens}
            />
            <FontesLeadCard fontesLeadData={fontesLeadData} />
            <FunilLeadsCard
              funilLeads={funilLeads}
              maxFunilValue={maxFunilValue}
              maxWidthPx={maxWidthPx}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
