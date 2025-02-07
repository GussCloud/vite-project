// GuidedTour.tsx
import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

const GuidedTour: React.FC = () => {
  const [run, setRun] = useState(true);

  const steps: Step[] = [
    {
      target: '.menu-button', // botão que abre o menu lateral
      content: 'Clique aqui para abrir o menu lateral e navegar pelas opções.',
      placement: 'right',
    },
    {
      target: '.header', // header da aplicação
      content: 'Este é o cabeçalho, onde você encontra informações e ações importantes.',
      placement: 'bottom',
    },
    {
      target: '.main-content', // área principal do conteúdo
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Veja este vídeo de introdução</h3>
          <iframe
            width="560"
            height="315"
            src="https://youtube.com/embed/dRtrKQa_mms" // Substitua VIDEO_ID pelo ID do vídeo
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
          ></iframe>
        </div>
      ),
      placement: 'bottom',
    },
    // Adicione outros passos conforme a necessidade...
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
        back: 'Voltar',
        close: 'Fechar',
        last: 'Finalizar',
        next: 'Próximo',
        skip: 'Pular Tour',
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default GuidedTour;
