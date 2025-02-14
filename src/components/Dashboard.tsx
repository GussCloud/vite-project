import React, { useState } from "react";
import { Pie } from "react-chartjs-2"; // Usando chartjs para o gráfico de pizza
import GuidedTourDashboard from "./GuidedTourDashboard"; // Importando o componente do tour guiado

const Dashboard: React.FC = () => {
  // Estado para controlar se o tour guiado deve ser executado
  const [runTour, setRunTour] = useState(false);

  // Dados Fake
  const envioHoje = 3456; // Valor fake para "Envios de Hoje"

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
    (total, plataforma) => total + plataforma.quantidade,
    0
  );

  // Dados fake para envios por canal no card "Total de Envios Hoje"
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

  // Dados para o gráfico de fontes de LEAD
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

  // Dados para as estatísticas de automações
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

  // Dados para o Funil de LEADS
  const funilLeads = [
    { etapa: "Cadastrados", valor: 3000 },
    { etapa: "Agendados", valor: 200 },
    { etapa: "Qualificados", valor: 50 },
    { etapa: "Vendas realizadas", valor: 7 },
  ];
  const maxFunilValue = funilLeads[0].valor;
  const maxWidthPx = 300; // largura máxima desejada para a etapa com maior valor

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Renderiza o GuidedTourDashboard quando runTour é true */}
      {runTour && <GuidedTourDashboard />}

      {/* Conteúdo Principal */}
      <div className="flex flex-col flex-grow">
        {/* Header do Dashboard com ícone para iniciar o tour */}
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

        {/* Área de Conteúdo */}
        <div className="dashbaord-cards overflow-auto flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Card 1: Total de Envios Hoje */}
            <div className="dashbaord-totalsend bg-gray-50 shadow-md rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Total de Envios Hoje
              </h2>
              <p className="text-5xl font-extrabold text-blue-500">
                {envioHoje}
              </p>
              <div className="mt-4 space-y-4 text-left">
                {enviosPorCanal.map((canal) => {
                  const porcentagem = (canal.quantidade / envioHoje) * 100;
                  return (
                    <div key={canal.plataforma}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <i
                            className={`${canal.icone} text-lg`}
                            style={{ color: canal.cor }}
                          ></i>
                          <span className="text-gray-700 text-sm">
                            {canal.plataforma}
                          </span>
                        </div>
                        <span className="text-gray-700 text-sm">
                          {canal.quantidade}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${porcentagem}%`,
                            backgroundColor: canal.cor,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Dados de Automações por Tipo */}
            <div className="dashbaord-infotypes bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Dados de Automações por Tipo
              </h3>
              <ul>
                {automacoesPorTipo.map((automacao) => {
                  const porcentagem = (automacao.quantidade / 200) * 100;
                  return (
                    <li key={automacao.tipo} className="mb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <i
                          className={`${automacao.icone} text-lg text-gray-700`}
                        />
                        <span className="text-gray-700 text-sm">
                          {automacao.tipo}
                        </span>
                        <span className="ml-auto text-gray-700 text-sm">
                          {automacao.quantidade}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${porcentagem}%`,
                            backgroundColor: automacao.cor,
                          }}
                        ></div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Card 3: Mensagens de Entrada */}
            <div className="dashbaord-sendmessages bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Mensagens de Entrada
              </h3>
              <ul>
                {mensagensDeEntrada.map((mensagem) => {
                  const porcentagem =
                    (mensagem.quantidade / totalMensagens) * 100;
                  return (
                    <li key={mensagem.plataforma} className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <i
                            className={`${mensagem.icone} text-lg`}
                            style={{ color: mensagem.cor }}
                          ></i>
                          <span className="text-gray-600">
                            {mensagem.plataforma}
                          </span>
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

            {/* Card 4: Fontes de LEAD */}
            <div className="dashbaord-leadorign bg-white shadow-md rounded-lg p-6 col-span-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Fontes de LEAD
              </h3>
              <div className="w-full h-72">
                <Pie data={fontesLeadData} />
              </div>
            </div>

            {/* Card 5: Funil de LEADS */}
            <div className="dashboard-leadfunnil bg-white shadow-md rounded-lg p-6 col-span-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Funil de LEADS
              </h3>
              <div className="space-y-6">
                {funilLeads.map((fase) => {
                  // Usando escala logarítmica para amenizar a diferença extrema entre os valores
                  const widthPx =
                    (Math.log(fase.valor) / Math.log(maxFunilValue)) *
                    maxWidthPx;
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
