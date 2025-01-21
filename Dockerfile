# Etapa 1: Construir a aplicação com Node.js
FROM node:18 AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos de configuração e dependências para o container
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Gerar a build de produção
RUN npm run build

# Etapa 2: Configurar o Nginx para servir os arquivos estáticos
FROM nginx:alpine AS production

# Copiar arquivos da build para a pasta pública do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Remover configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Adicionar uma nova configuração para gerenciar o SPA
COPY nginx.conf /etc/nginx/conf.d

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
