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
import { isAuthenticated } from "./services/authService"; // Função para verificar autenticação
import Kanban from "./components/Kanban";

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
        {/* Rota Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rota Protegida */}
        <Route
          path="/automacoes"
          element={
            <ProtectedRoute>
              <Automacoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <Kanban />
            </ProtectedRoute>
          }
        />
        {/* Redirecionar rotas inválidas para login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
