import React from "react";
import { Outlet } from "react-router-dom";
import MenuLateral from "./MenuLateral";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menu Lateral */}
      <MenuLateral />

      {/* Conteúdo Principal */}
      <div className="flex flex-col flex-grow">
        {/* Header aplicado a todas as páginas */}
        <Header />

        {/* Conteúdo das páginas */}
        <div className="p-6 overflow-auto flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
