// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import MenuLateral from "./MenuLateral";
import Header from "./Header";
import GuidedTour from "./GuidedTour";

const Layout: React.FC = () => {
  return (
    <>
      {/* Componente do tour guiado */}
      <GuidedTour />
      
      <div className="flex min-h-screen bg-gray-100">
        {/* Menu Lateral */}
        <MenuLateral />
        {/* Conteúdo Principal */}
        <div className="flex flex-col flex-grow">
          {/* Header com classe para o tour */}
          <div className="header">
            <Header />
          </div>
          {/* Área de Conteúdo com classe para o tour */}
          <div className="p-6 overflow-auto flex-grow main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
