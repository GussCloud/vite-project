import React, { useState, useEffect } from "react";
import SmartTagCard from "./SmartTagCard";
import NovaSmartTag from "./NovaSmartTag";

interface SmartTag {
  id: number;
  tag: string;
  descricao: string;
  cor: string;
  condicaoSe?: string;
  condicaoEntao?: string;
}

const SmartTags: React.FC = () => {
  const [smartTags, setSmartTags] = useState<SmartTag[]>([]);
  const [isNovaSmartTagOpen, setIsNovaSmartTagOpen] = useState(false);

  // Simulação de dados fake
  useEffect(() => {
    const dadosFake: SmartTag[] = [
      {
        id: 1,
        tag: "#NOVO CLIENTE",
        descricao: "Marca novos clientes para campanhas específicas.",
        cor: "#8B5CF6",
        condicaoSe: "Cadastro - Web",
        condicaoEntao: "Enviar oferta de boas-vindas",
      },
      {
        id: 2,
        tag: "#VIP",
        descricao: "Clientes com alto potencial de compra.",
        cor: "#F59E0B",
        condicaoSe: "Compra acima de R$500",
        condicaoEntao: "Enviar atendimento exclusivo",
      },
    ];
    setSmartTags(dadosFake);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white w-full max-w-7xl rounded-lg shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Smart Tags</h1>
        <button
          onClick={() => setIsNovaSmartTagOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md flex items-center"
        >
          <i className="fas fa-plus-circle mr-2"></i> Nova Smart Tag
        </button>
      </div>

      {/* Lista de Smart Tags */}
      <div className="w-full max-w-7xl mt-6 space-y-4">
        {smartTags.map((smartTag) => (
          <SmartTagCard key={smartTag.id} {...smartTag} />
        ))}
      </div>

      {/* Modal para Nova Smart Tag */}
      <NovaSmartTag
        isOpen={isNovaSmartTagOpen}
        onClose={() => setIsNovaSmartTagOpen(false)}
        onCriar={(novaTag) => {
          setSmartTags((prev) => [...prev, { id: Date.now(), ...novaTag }]);
          setIsNovaSmartTagOpen(false);
        }}
      />
    </div>
  );
};

export default SmartTags;
