import React from "react";
import Chart from "react-apexcharts";

interface Mensagem {
  plataforma: string;
  icone: string;
  cor: string;
  quantidade: number;
}

interface MensagensEntradaProps {
  mensagensDeEntrada: Mensagem[];
  totalMensagens: number;
}

const MensagensEntradaCardV2: React.FC<MensagensEntradaProps> = ({
  mensagensDeEntrada,
  totalMensagens,
}) => {
  // Calculate series percentages and extract labels/colors
  const series = mensagensDeEntrada.map((mensagem) =>
    Number(((mensagem.quantidade / totalMensagens) * 100).toFixed(2))
  );
  const labels = mensagensDeEntrada.map((mensagem) => mensagem.plataforma);
  const colors = mensagensDeEntrada.map((mensagem) => mensagem.cor);

  const options = {
    chart: {
      type: "radialBar" as const,
    },
    plotOptions: {
      radialBar: {
        // Custom Angle Circle configuration:
        startAngle: -90,
        endAngle: 270,
        dataLabels: {
          name: {
            fontSize: "16px",
          },
          value: {
            fontSize: "14px",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    // Adding legends with respective labels:
    legend: {
      show: true,
      position: "bottom" as const,
      horizontalAlign: "center" as const,
      labels: {
        colors: "#000",
      },
    },
    labels,
    colors,
  };

  return (
    <div className="dashboard-sendmessages-v2 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Mensagens de Entrada - V2
      </h3>
      <div className="flex justify-center">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height="350"
        />
      </div>
    </div>
  );
};

export default MensagensEntradaCardV2;
