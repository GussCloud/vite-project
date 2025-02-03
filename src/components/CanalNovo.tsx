import React from "react";
import Modal from "react-modal";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookMessenger,
  FaTelegram,
} from "react-icons/fa";

interface CanalNovoProps {
  isOpen: boolean;
  onClose: () => void;
}

type Channel = "WhatsApp" | "Instagram" | "Messenger" | "Telegram";

interface ChannelCardProps {
  icon: JSX.Element;
  name: Channel;
  onAdd: (channel: Channel) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ icon, name, onAdd }) => {
  return (
    <div className="cursor-pointer border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg flex flex-col items-center justify-center transition duration-200 w-64 h-64">
      <div className="w-16 h-16 flex items-center justify-center">{icon}</div>
      <p className="mt-4 font-semibold text-center">{name}</p>
      <button
        onClick={() => onAdd(name)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Adicionar
      </button>
    </div>
  );
};

const CanalNovo: React.FC<CanalNovoProps> = ({ isOpen, onClose }) => {
  const handleAddChannel = (channel: Channel) => {
    console.log(`Canal ${channel} adicionado!`);
    // Aqui você pode implementar a lógica para adicionar o canal e/ou fechar a modal.
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Novo Canal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white text-lg font-semibold p-4 rounded-t-lg flex justify-between items-center">
          <span>Novo Canal</span>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            ✖
          </button>
        </div>
        {/* Conteúdo */}
        <div className="p-8">
          <div className="flex flex-wrap justify-center gap-8">
            <ChannelCard
              icon={<FaWhatsapp size={50} color="#25D366" />}
              name="WhatsApp"
              onAdd={handleAddChannel}
            />
            <ChannelCard
              icon={<FaInstagram size={50} color="#C13584" />}
              name="Instagram"
              onAdd={handleAddChannel}
            />
            <ChannelCard
              icon={<FaFacebookMessenger size={50} color="#0084FF" />}
              name="Messenger"
              onAdd={handleAddChannel}
            />
            <ChannelCard
              icon={<FaTelegram size={50} color="#0088cc" />}
              name="Telegram"
              onAdd={handleAddChannel}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CanalNovo;
