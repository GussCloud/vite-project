```typescript
// src/components/NewIATeste.tsx
import React, { useState, useEffect } from "react";
import AutomacaoCard from "./AutomacaoCard";
import NovaAutomacao from "./NovaAutomacao";
import AutomacoesFiltrar from "./AutomacoesFiltrar";

interface Automacao {
  id: number;
  descricao: string;
  detalhes: string;
  estatisticas: {
    enviadas: number[];
    entregues: number[];
    respondidas: number[];
    finalizadas: number[];
  };
  ativa: boolean;
  tipo: string;
}

const NewIATeste: React.FC = () => {
  const [automacoes, setAutomacoes] = useState<Automacao[]>([]);
  const [filtros, setFiltros] = useState<{ ativa?: boolean; tipo?: string }>({});
  const [isNovaAutomacaoOpen, setIsNovaAutomacaoOpen] = useState(false);
  const [isFiltrarOpen, setIsFiltrarOpen] = useState(false);

  useEffect(() => {
    // Fetch automacoes data
  }, [filtros]);

  const handleFilter = (filtros: { ativa?: boolean; tipo?: string }) => {
    setFiltros(filtros);
    setIsFiltrarOpen(false);
  };

  const handleClearFilters = () => {
    setFiltros({});
    setIsFiltrarOpen(false);
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ajusteado Por AI</h1>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setIsFiltrarOpen(true)}
          >
            Filtrar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setIsNovaAutomacaoOpen(true)}
          >
            Nova Automação
          </button>
        </div>
      </header>
      <AutomacoesFiltrar
        isOpen={isFiltrarOpen}
        onClose={() => setIsFiltrarOpen(false)}
        onFilter={handleFilter}
        onClearFilters={handleClearFilters}
      />
      <NovaAutomacao isOpen={isNovaAutomacaoOpen} onClose={() => setIsNovaAutomacaoOpen(false)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {automacoes.map((automacao) => (
          <AutomacaoCard key={automacao.id} {...automacao} />
        ))}
      </div>
    </div>
  );
};

export default NewIATeste;
```

```typescript
// src/components/Layout.tsx
import React from "react";
import { Link } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <nav className="w-64 bg-gray-800 text-white min-h-screen">
        <div className="p-4 text-2xl font-bold">Menu</div>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/automacoes">Automacoes</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/canais">Canais</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/smarttags">SmartTags</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/newiateste">Ajusteado Por AI</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;
```

```typescript
// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Automacoes from "./components/Automacoes";
import Dashboard from "./components/Dashboard";
import Kanban from "./components/Kanban";
import Layout from "./components/Layout";
import { isAuthenticated } from "./services/authService";
import Canais from "./components/Canais";
import SmartTags from "./components/SmartTags";
import NewIATeste from "./components/NewIATeste";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            isAuthenticated() ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/automacoes" element={<Automacoes />} />
                  <Route path="/canais" element={<Canais />} />
                  <Route path="/smarttags" element={<SmartTags />} />
                  <Route path="/newiateste" element={<NewIATeste />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
```