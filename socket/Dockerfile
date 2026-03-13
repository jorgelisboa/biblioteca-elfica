# ─── Etapa 1: instalar dependências ──────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

# ─── Etapa 2: imagem final ────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Cria usuário sem privilégios de root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 socketuser

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN chown -R socketuser:nodejs /app
USER socketuser

EXPOSE 3001

CMD ["node", "src/index.js"]
