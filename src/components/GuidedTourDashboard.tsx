// GuidedTour.tsx
import React, { useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

const GuidedTourDashboard: React.FC = () => {
  const [run, setRun] = useState(true);

  const steps: Step[] = [
    {
      target: ".menu-button", // botão que abre o menu lateral
      content: "Clique aqui para abrir o menu lateral e navegar pelas opções.",
      placement: "right",
    },
    {
      target: ".header", // header da aplicação
      content:
        "Este é o cabeçalho, onde você encontra informações e ações importantes.",
      placement: "bottom",
    },
    {
      target: ".dashbaord-infotypes", // header da aplicação
      content:
        "Este é o cabeçalho, onde você encontra informações e ações importantes.",
      placement: "bottom",
    },
    {
      target: ".dashboard-leadfunnil", // header da aplicação
      content:
        "Este é o cabeçalho, onde você encontra informações e ações importantes.",
      placement: "bottom",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(data.status as "finished" | "skipped")) {
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      scrollToFirstStep={true}
      callback={handleJoyrideCallback}
      locale={{
        back: "Voltar",
        close: "Fechar",
        last: "Finalizar",
        next: "Próximo",
        skip: "Pular Tour",
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default GuidedTourDashboard;
