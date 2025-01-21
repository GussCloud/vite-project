import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Automacoes from "./components/Automacoes";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Página de Login */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Página de Automações protegida */}
        <Route
          path="/automacoes"
          element={
            isAuthenticated ? <Automacoes /> : <Navigate to="/login" replace />
          }
        />

        {/* Redirecionar para login por padrão */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
