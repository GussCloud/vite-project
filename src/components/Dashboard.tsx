import React from "react";
import MenuConnect from "./MenuConnect"; // Importando o Menu v1

const Dashboard: React.FC = () => {
  // Dados Fake
  const envioHoje = 3456; // Valor fake para "Envios de Hoje"
  const enviosPorTipo = [
    { tipo: "Email", quantidade: 1200 },
    { tipo: "SMS", quantidade: 800 },
    { tipo: "Push Notification", quantidade: 1456 },
  ]; // Tipos e dados fake

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* MenuConnect */}
      <MenuConnect />

      {/* Conteúdo do Dashboard */}
      <div className="p-6 bg-gray-100 flex flex-col items-center flex-grow">
        {/* Título */}
        <h1 className="text-4xl font-light text-gray-800 mb-8 w-full max-w-7xl">
          Dashboard
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
          {/* Card 1: Envios de Hoje */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-light text-gray-700 mb-4">
              Envios de Hoje
            </h2>
            <p className="text-5xl font-light text-blue-500">{envioHoje}</p>
          </div>

          {/* Card 2: Envios por Tipo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-light text-gray-700 mb-4">
              Envios por Tipo
            </h2>
            <ul>
              {enviosPorTipo.map((envio) => (
                <li
                  key={envio.tipo}
                  className="flex justify-between text-gray-600 py-2 border-b last:border-b-0"
                >
                  <span>{envio.tipo}</span>
                  <span className="font-light text-lg">{envio.quantidade}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Mensagens de Entrada */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-light text-gray-700 mb-4">
              Mensagens de Entrada
            </h2>
            <ul>
              {mensagensDeEntrada.map((mensagem) => {
                const porcentagem =
                  (mensagem.quantidade / totalMensagens) * 100;

                return (
                  <li key={mensagem.plataforma} className="mb-4">
                    {/* Título e Ícone */}
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

                    {/* Barra de Progresso */}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
