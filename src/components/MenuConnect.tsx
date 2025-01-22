import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MenuConnect: React.FC = () => {
  const menuData = [
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
          icon: "fas fa-robot",
          action: () => navigate("/automacoes"),
        },
        {
          label: "Histórico de Notificação",
          icon: "fas fa-history",
          action: () => navigate("/historico-notificacao"),
        },
      ],
    },
    {
      label: "Agendar Post",
      icon: "fas fa-calendar-alt",
      submenu: [
        { label: "Novo Post", icon: "fas fa-plus" },
        { label: "Posts Agendados", icon: "fas fa-list" },
      ],
    },
    {
      label: "Calendário",
      icon: "fas fa-calendar",
      submenu: [
        { label: "Eventos", icon: "fas fa-calendar-day" },
        { label: "Tarefas", icon: "fas fa-tasks" },
      ],
    },
    {
      label: "Relatórios",
      icon: "fas fa-chart-line",
      submenu: [
        { label: "Relatório Mensal", icon: "fas fa-file-alt" },
        { label: "Relatório Semanal", icon: "fas fa-file-contract" },
      ],
    },
    {
      label: "Insights IA",
      icon: "fas fa-lightbulb",
      submenu: [
        { label: "Sugestões de Post", icon: "fas fa-magic" },
        { label: "Análise de Dados", icon: "fas fa-brain" },
      ],
    },
  ];

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Fecha o menu de perfil ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    Cookies.remove("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logotipo */}
        <div className="flex items-center space-x-4">
          <img
            src="https://media.licdn.com/dms/image/v2/C560BAQEDWqhCd8NjCQ/company-logo_200_200/company-logo_200_200/0/1630647394125/evup_logo?e=1745452800&v=beta&t=9aYENd0uDMZ3wQNSKiHfG7M-jS5w7TQRaYPTqdR_FjM"
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-gray-800">Connect</span>
        </div>

        {/* Menu Principal */}
        <nav className="flex space-x-6 relative">
          {menuData.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => menu.submenu && handleMouseEnter(menu.label)}
              onMouseLeave={menu.submenu && handleMouseLeave}
            >
              <button
                onClick={menu.action}
                className="text-gray-500 hover:text-orange-500 flex flex-col items-center"
              >
                <i className={`${menu.icon} text-lg`}></i>
                <span className="text-sm">{menu.label}</span>
              </button>

              {/* Submenu */}
              {activeMenu === menu.label && menu.submenu && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-2 w-48">
                  {menu.submenu.map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action ? item.action : undefined}
                      className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-md w-full text-left"
                    >
                      <i className={`${item.icon} text-gray-500`}></i>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Perfil */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 text-gray-500 hover:text-orange-500"
          >
            <img
              src="https://media.licdn.com/dms/image/v2/C560BAQEDWqhCd8NjCQ/company-logo_200_200/company-logo_200_200/0/1630647394125/evup_logo?e=1745452800&v=beta&t=9aYENd0uDMZ3wQNSKiHfG7M-jS5w7TQRaYPTqdR_FjM"
              alt="Dev Master"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">Dev Master</span>
            <i className="fas fa-chevron-down"></i>
          </button>

          {/* Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MenuConnect;
