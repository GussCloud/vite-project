import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MenuLateral: React.FC = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true); // Menu contraído por padrão
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false); // Estado para hover

  const menuItems = [
    {
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
      action: () => navigate("/dashboard"),
    },
    {
      label: "Comunicação",
      icon: "fas fa-comments",
      submenu: [
        {
          label: "Automações",
          action: () => navigate("/automacoes"),
        },
        {
          label: "Histórico de Notificações",
          action: () => navigate("/historico-notificacoes"),
        },
      ],
    },
  ];

  const toggleMenu = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu)); // Alterna o submenu
  };

  const isMenuExpanded = !isCollapsed || isHovering;

  return (
    <div
      className={`fixed top-0 left-0 h-full text-gray-800 flex flex-col transition-all duration-300 ${
        isMenuExpanded ? "w-64" : "w-16"
      } bg-white shadow-md z-50`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cabeçalho */}
      <div
        className={`p-4 flex items-center ${
          isMenuExpanded ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex items-center space-x-2">
          <i className="fas fa-rocket text-orange-500 text-2xl"></i>
          {isMenuExpanded && (
            <span className="text-lg font-semibold">Connect</span>
          )}
        </div>
        {isMenuExpanded && (
          <button
            onClick={toggleMenu}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        )}
        {!isMenuExpanded && (
          <button
            onClick={toggleMenu}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>

      {/* Itens do Menu */}
      <nav className="flex-grow space-y-2 px-2">
        {menuItems.map((item) =>
          item.submenu ? (
            <div key={item.label}>
              {/* Menu Principal */}
              <button
                onClick={() => handleMenuClick(item.label)}
                className={`flex items-center w-full px-4 py-3 transition ${
                  isMenuExpanded ? "justify-start" : "justify-center"
                } bg-gray-100 hover:bg-gray-200 rounded-lg`}
              >
                <i className={`${item.icon} text-xl`}></i>
                {isMenuExpanded && (
                  <>
                    <span className="ml-4">{item.label}</span>
                    <i
                      className={`ml-auto fas ${
                        activeMenu === item.label
                          ? "fa-chevron-up"
                          : "fa-chevron-down"
                      }`}
                    ></i>
                  </>
                )}
              </button>

              {/* Submenu */}
              {isMenuExpanded && activeMenu === item.label && (
                <div className="pl-8 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.label}
                      onClick={subItem.action}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-200 transition bg-gray-50 rounded-lg"
                    >
                      <i className="fas fa-circle text-xs text-gray-400 mr-4"></i>
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex items-center w-full px-4 py-3 transition ${
                isMenuExpanded ? "justify-start" : "justify-center"
              } bg-gray-100 hover:bg-gray-200 rounded-lg`}
            >
              <i className={`${item.icon} text-xl`}></i>
              {isMenuExpanded && <span className="ml-4">{item.label}</span>}
            </button>
          )
        )}
      </nav>

      {/* Botão de Logout */}
      <div className="p-4 border-t border-gray-300">
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            navigate("/login");
          }}
          className={`flex items-center w-full text-left text-red-400 hover:text-red-500 ${
            isMenuExpanded ? "justify-start" : "justify-center"
          }`}
        >
          <i className="fas fa-sign-out-alt text-xl"></i>
          {isMenuExpanded && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default MenuLateral;
