import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface SmartTagData {
  tag: string;
  cor: string;
  descricao: string;
  condicaoSe?: string;
  condicaoEntao?: string;
}

interface NovaSmartTagProps {
  isOpen: boolean;
  onClose: () => void;
  onCriar: (novaTag: SmartTagData) => void;
  initialData?: SmartTagData; // Dados iniciais para edição (opcional)
}

const NovaSmartTag: React.FC<NovaSmartTagProps> = ({ isOpen, onClose, onCriar, initialData }) => {
  const [tag, setTag] = useState(initialData?.tag || "");
  const [cor, setCor] = useState(initialData?.cor || "#000000");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [condicaoSe, setCondicaoSe] = useState(initialData?.condicaoSe || "");
  const [condicaoEntao, setCondicaoEntao] = useState(initialData?.condicaoEntao || "");

  // Se os dados iniciais mudarem, atualiza os estados (modo edição)
  useEffect(() => {
    setTag(initialData?.tag || "");
    setCor(initialData?.cor || "#000000");
    setDescricao(initialData?.descricao || "");
    setCondicaoSe(initialData?.condicaoSe || "");
    setCondicaoEntao(initialData?.condicaoEntao || "");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCriar({
      tag,
      cor,
      descricao,
      condicaoSe,
      condicaoEntao,
    });
    // Limpar campos (opcional, ou você pode manter os dados para edição contínua)
    setTag("");
    setCor("#000000");
    setDescricao("");
    setCondicaoSe("");
    setCondicaoEntao("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Nova Smart Tag"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white text-lg font-semibold p-4 rounded-t-lg flex justify-between items-center">
          <span>{initialData ? "Editar Smart Tag" : "Nova Smart Tag"}</span>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            ✖
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block font-semibold mb-1">Tag:</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Ex: #NOVO CLIENTE"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Cor:</label>
            <input
              type="color"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              className="w-16 h-10 p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Descrição:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Breve descrição do que a tag fará"
            ></textarea>
          </div>

          <hr className="border-t border-gray-300" />

          <div>
            <label className="block font-semibold mb-1">SE:</label>
            <div className="flex items-center">
              <input
                type="text"
                value={condicaoSe}
                onChange={(e) => setCondicaoSe(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Condição SE"
              />
              <button
                type="button"
                onClick={() => {
                  // Lógica para adicionar condição SE (se necessário)
                }}
                className="ml-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
              >
                Adicionar
              </button>
            </div>
          </div>

          <hr className="border-t border-gray-300" />

          <div>
            <label className="block font-semibold mb-1">ENTÃO:</label>
            <div className="flex items-center">
              <input
                type="text"
                value={condicaoEntao}
                onChange={(e) => setCondicaoEntao(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Condição ENTÃO"
              />
              <button
                type="button"
                onClick={() => {
                  // Lógica para adicionar condição ENTÃO (se necessário)
                }}
                className="ml-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
              >
                Adicionar
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md">
              {initialData ? "Salvar Alterações" : "Criar Tag"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NovaSmartTag;
