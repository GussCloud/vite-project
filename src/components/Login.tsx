import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  authenticateUser,
  setSessionAuthenticated,
} from "../services/authService";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await authenticateUser(username, password);

      if (data.error === "false") {
        setSessionAuthenticated(); // Armazena a autenticação no cookie
        navigate("/dashboard"); // Redireciona para automações
      } else {
        throw new Error("Usuário ou senha inválidos.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Erro ao realizar o login.");
      } else {
        setErrorMessage("Erro ao realizar o login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-200 to-white">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex overflow-hidden">
        {/* Lado esquerdo com a imagem */}
        <div className="w-1/2 bg-gray-200">
          <img
            src="https://storage.guss.dev.br/typebot/public/workspaces/cm5l2dige0000q70dd6nue9x1/typebots/cm6jq7pg90013q70dpz8fh5gr/blocks/k2f0v1ukieb1lmca124hgre0?v=1738787846392"
            alt="Login Illustration"
            className="w-max h-full object-cover"
          />
        </div>

        {/* Formulário de login */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Bem-vindo de volta!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {errorMessage}
              </div>
            )}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-900 to-blue-700 hover:bg-gradient-to-l from-blue-700 to-blue-500"
              }`}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
