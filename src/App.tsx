import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Automacoes from "./pages/Automacoes";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Layout from "./components/Layout"; // Importamos o novo Layout
import { isAuthenticated } from "./services/authService";
import Canais from "./pages/Canais";
import SmartTags from "./components/SmartTags";

// Componente para Rotas Protegidas
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota de Login (Sem Layout) */}
        <Route path="/login" element={<Login />} />

        {/* Aplicando Layout automaticamente a todas as rotas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/automacoes" element={<Automacoes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/canais" element={<Canais />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/SmartTags" element={<SmartTags />} />
        </Route>

        {/* Redirecionar rotas inválidas para login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
