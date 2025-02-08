// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import MenuLateral from "./MenuLateral";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <>
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
