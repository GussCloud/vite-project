// ReleaseNotes.tsx
import React from "react";
import Modal from "react-modal";

interface ReleaseNotesProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReleaseNotes: React.FC<ReleaseNotesProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Release Notes"
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-scroll"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
        {/* Header do Modal */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold">Release Notes 1.0.0.0</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            ✖
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Publicado em: 01/01/2025 10:00 AM
        </p>

        {/* Seção de Melhorias e Novas Funcionalidades */}
        <h3 className="text-xl font-semibold mb-4">
          Melhorias e Novas Funcionalidades
        </h3>

        {/* Vídeo embutido */}
        <div className="mb-6">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/VaE2Cm2TEfQ?si=_5fziTQ8FEf2_Yh-" // Substitua VIDEO_ID pelo ID do vídeo desejado
            title="Resumo das Melhorias"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Itens e prints das melhorias */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded p-4">
            <h4 className="text-lg font-semibold mb-1">
              Melhoria 1: [Implementação do Typebot]
            </h4>
            <p className="text-sm text-gray-700">
              Fizems a implementação do Typebot para a geração de fluxos de
              chatbot.
            </p>
            <img
              src="https://blog.remontti.com.br/wp-content/uploads/2023/09/builder-screenshot-scaled.webp"
              alt="Print da Melhoria 1"
              className="mt-2 rounded"
            />
          </div>
          <div className="border border-gray-200 rounded p-4">
            <h4 className="text-lg font-semibold mb-1">
              Melhoria 2: [Indicadores Metabase]
            </h4>
            <p className="text-sm text-gray-700">
              Realizamos a integração com a ferramenta Metabase para geração de
              indicadores.
            </p>
            <img
              src="https://www.metabase.com/docs/latest/images/metabase-product-screenshot.png"
              alt="Print da Melhoria 2"
              className="mt-2 rounded"
            />
          </div>
          {/* Adicione mais itens conforme necessário */}
        </div>
      </div>
    </Modal>
  );
};

export default ReleaseNotes;
