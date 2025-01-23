import React from "react";
import MenuLateral from "./MenuLateral";

const Dashboard: React.FC = () => {
  // Dados Fake
  const envioHoje = 3456; // Valor fake para "Envios de Hoje"
  const enviosPorTipo = [
    { tipo: "Email", quantidade: 1200 },
    { tipo: "SMS", quantidade: 800 },
    { tipo: "Push Notification", quantidade: 1456 },
  ];

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
    <div className="flex">
      {/* Menu Lateral */}
      <MenuLateral />

      {/* Conteúdo Principal */}
      <div className="flex-grow p-6 bg-gray-100 overflow-auto">
        {/* Título */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-light text-gray-800">Dashboard</h1>
        </div>

        {/* Painel de Indicadores Detalhados */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="col-span-1 lg:col-span-4 bg-white rounded-lg shadow-md">
            {/* Barra Superior */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-2 px-4 rounded-t-lg">
              <h2 className="text-white font-semibold text-lg">
                Indicadores Detalhados
              </h2>
            </div>

            {/* Conteúdo do Painel */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Envios de Hoje */}
              <div className="bg-gray-50 shadow-md rounded-lg p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Envios de Hoje
                </h2>
                <p className="text-5xl font-extrabold text-blue-500">
                  {envioHoje}
                </p>
              </div>

              {/* Envios por Tipo */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Envios por Tipo
                </h3>
                <ul>
                  {enviosPorTipo.map((envio) => (
                    <li
                      key={envio.tipo}
                      className="flex justify-between text-gray-600 py-2 border-b last:border-b-0"
                    >
                      <span>{envio.tipo}</span>
                      <span className="font-light text-lg">
                        {envio.quantidade}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mensagens de Entrada */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Mensagens de Entrada
                </h3>
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
      </div>
    </div>
  );
};

export default Dashboard;
