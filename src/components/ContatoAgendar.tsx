import React, { useState } from "react";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ContatoAgendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContatoAgendar: React.FC<ContatoAgendarProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agendar Contato"
      ariaHideApp={false}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Agendar Contato</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-2xl">
            ✖
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Calendário */}
          <div className="flex-1">
            <label className="block text-gray-700 mb-2">Selecione a Data:</label>
            <Calendar
              value={selectedDate}
              onChange={(value) => {
                if (value instanceof Date) {
                  setSelectedDate(value);
                }
              }}
              className="w-full"
            />
          </div>
          {/* Horários Disponíveis */}
          <div className="flex-1">
            <label className="block text-gray-700 mb-2">Horários Disponíveis:</label>
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`border rounded-lg p-2 text-center ${
                    selectedTime === time
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              // Aqui você pode implementar a lógica de agendamento, se necessário.
              onClose();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ContatoAgendar;
