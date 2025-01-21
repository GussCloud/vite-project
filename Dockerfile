# Etapa 1: Construir a aplicação
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

# Etapa 2: Rodar a aplicação
FROM node:18 AS runner

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos da build para o container
COPY --from=builder /app/dist ./dist

# Instalar o Vite como dependência global para servir os arquivos
RUN npm install -g vite

# Expor a porta do Vite
EXPOSE 4173

# Comando para rodar o servidor Vite em modo preview
CMD ["vite", "preview"]
