// src/services/authService.ts
import Cookies from "js-cookie";

export interface LoginResponse {
  error: string; // "false" para sucesso ou mensagem de erro
  token: string; // Token de autenticação retornado pela API
}

// Nome do cookie para armazenar a autenticação
const AUTH_COOKIE_NAME = "isAuthenticated";

// Função para autenticar o usuário
export const authenticateUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(
    "https://flows.guss.dev.br/webhook/39c6b176-4551-4ce4-965d-e9cb265794e6",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao conectar à API.");
  }

  const data: LoginResponse = await response.json();
  return data;
};

// Função para armazenar o estado de autenticação em um cookie
export const setSessionAuthenticated = (): void => {
  Cookies.set(AUTH_COOKIE_NAME, "true", {
    expires: 1, // O cookie expira em 1 dia
    secure: false, // Apenas via HTTPS
    sameSite: "Strict", // Previne envio para outras origens
  });
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  return Cookies.get(AUTH_COOKIE_NAME) === "true";
};

// Função para limpar a autenticação
export const clearAuthentication = (): void => {
  Cookies.remove(AUTH_COOKIE_NAME);
};
