import React from "react";
import DashCard from "./DashCard";

const DashCardExample: React.FC = () => {
  // Sample data for demonstration
  const sampleData = [
    { x: "Janeiro", y: 65 },
    { x: "Fevereiro", y: 59 },
    { x: "Março", y: 80 },
    { x: "Abril", y: 81 },
    { x: "Maio", y: 56 },
    { x: "Junho", y: 55 },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <DashCard type="bargraph" title="Vendas Mensais" values={sampleData} />
    </div>
  );
};

export default DashCardExample;