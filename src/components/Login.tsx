import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://flows.guss.dev.br/webhook-test/39c6b176-4551-4ce4-965d-e9cb265794e6",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (data.error === "false") {
        setIsAuthenticated(true);
        navigate("/automacoes"); // Redireciona para a página de automações
      } else {
        setErrorMessage("Usuário ou senha inválidos.");
      }
    } catch (error) {
      setErrorMessage("Erro ao realizar o login.");
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
            src="https://storage.guss.dev.br/typebot/public/workspaces/cm5l2dige0000q70dd6nue9x1/typebots/cm5mu4mb3000oq70d0j6dd42v/blocks/z0m1f8bjqgx0s533ovsu0d1h?v=1737403368138"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formulário de login */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Bem-vindo de volta!
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </button>
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Esqueci minha senha
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
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
