import React from "react";

interface KanbanCardProps {
  id: number;
  nome: string;
  telefone: string;
  foto: string;
  origem: "whatsapp" | "instagram" | "facebook" | "email";
  tags: string[];
  dataCriacao: Date;
}

// Ícones das origens com cores específicas
const origemIcones = {
  whatsapp: "fab fa-whatsapp text-green-500",
  instagram: "fab fa-instagram text-pink-500",
  facebook: "fab fa-facebook text-blue-600",
  email: "fas fa-envelope text-gray-500",
};

const calcularTempoPassado = (dataCriacao: Date): string => {
  const agora = new Date();
  const diferenca = Math.floor(
    (agora.getTime() - new Date(dataCriacao).getTime()) / 1000
  ); // Diferença em segundos

  if (diferenca < 60) return `${diferenca} seg atrás`;
  if (diferenca < 3600) return `${Math.floor(diferenca / 60)} min atrás`;
  if (diferenca < 86400) return `${Math.floor(diferenca / 3600)} h atrás`;
  return `${Math.floor(diferenca / 86400)} dias atrás`;
};

const KanbanCard: React.FC<KanbanCardProps> = ({
  nome,
  telefone,
  foto,
  origem,
  tags,
  dataCriacao,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col relative border border-gray-200">
      {/* Foto e Informações do Lead */}
      <div className="flex items-center space-x-4">
        <img
          src={foto}
          alt={nome}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 text-[16px]">
            {nome}
          </h3>
          <p className="text-gray-600 text-sm">{telefone}</p>
        </div>
      </div>

      {/* Ícone de Origem no canto inferior direito */}
      <div className="absolute bottom-2 right-2 bg-gray-100 p-1 rounded-full shadow-sm">
        <i className={`${origemIcones[origem]} text-lg`}></i>
      </div>

      {/* Tags na parte inferior do card */}
      <div className="mt-3 flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-200 text-blue-800 text-[9px] px-2 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Data de Criação e Tempo Passado */}
      <div className="mt-3 text-gray-500 text-[11px]">
        <span>{dataCriacao.toLocaleDateString()}</span>
        <span className="mx-1">•</span>
        <span>{calcularTempoPassado(dataCriacao)}</span>
      </div>
    </div>
  );
};

export default KanbanCard;
