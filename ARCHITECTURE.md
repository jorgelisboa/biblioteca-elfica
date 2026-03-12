# Biblioteca Élfica — Arquitetura & Roadmap

> VTT (Virtual Tabletop) local-first para campanhas de RPG.
> Roda na rede local (LAN), sem dependência de internet.

---

## Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                      REDE LOCAL (LAN)                            │
│                                                                  │
│  ┌──────────┐   ┌──────────────────────────────────────────┐    │
│  │  Mestre  │──▶│           Docker Compose                 │    │
│  │ (browser)│   │                                          │    │
│  └──────────┘   │  ┌──────────────┐  ┌─────────────────┐  │    │
│                 │  │  app         │  │   postgres       │  │    │
│  ┌──────────┐   │  │  Next.js     │◀─│   PostgreSQL 16  │  │    │
│  │ Player 1 │──▶│  │  :3000       │  │   :5432          │  │    │
│  │ (browser)│   │  │              │  └─────────────────┘  │    │
│  └──────────┘   │  │  - Pages     │                        │    │
│                 │  │  - API Routes│  ┌─────────────────┐  │    │
│  ┌──────────┐   │  │  - Socket.IO │  │   pgadmin        │  │    │
│  │ Player 2 │──▶│  │              │  │   (opcional)     │  │    │
│  │ (browser)│   │  └──────────────┘  │   :5050          │  │    │
│  └──────────┘   │                    └─────────────────┘  │    │
│                 └──────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

O mestre roda `docker compose up` na máquina dele.
Players abrem o navegador em `http://<IP-DO-MESTRE>:3000`.

---

## Stack Tecnológica

| Camada         | Tecnologia              | O que você vai aprender                                      |
|----------------|-------------------------|--------------------------------------------------------------|
| Framework      | **Next.js 14 (App Router)** | SSR, RSC, file-based routing, server actions             |
| Linguagem      | **TypeScript**          | Tipagem estática, interfaces, generics                       |
| Estilo         | **Tailwind CSS**        | Utility-first CSS, dark mode, responsividade                 |
| Banco          | **PostgreSQL 16**       | SQL real, relações, índices, JSONB para fichas               |
| ORM            | **Prisma**              | Schema-first, migrations, type-safe queries                  |
| Auth           | **NextAuth.js v5**      | Sessões, JWT, providers, proteção de rotas                   |
| Tempo real     | **Socket.IO**           | WebSocket, rooms, eventos, sincronização bidirecional        |
| Containers     | **Docker + Compose**    | Imagens, volumes, redes, variáveis de ambiente               |
| Validação      | **Zod**                 | Schemas, parse, inferência de tipos                          |

---

## Estrutura de Pastas

```
biblioteca-elfica/
│
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (app)/                    # Rotas protegidas (requer login)
│   │   ├── layout.tsx            # Layout com sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Hub: minhas campanhas, fichas
│   │   ├── campaigns/
│   │   │   ├── page.tsx          # Listar campanhas
│   │   │   ├── new/
│   │   │   │   └── page.tsx      # Criar campanha
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Lobby da campanha
│   │   │       ├── vtt/
│   │   │       │   └── page.tsx  # Mesa virtual
│   │   │       └── characters/
│   │   │           ├── page.tsx
│   │   │           └── [charId]/
│   │   │               └── page.tsx  # Ficha do personagem
│   │   └── compendium/           # Conteúdo dos sistemas
│   │       └── [system]/
│   │           └── page.tsx
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts      # NextAuth handler
│       ├── campaigns/
│       │   └── route.ts
│       ├── characters/
│       │   └── route.ts
│       └── socket/
│           └── route.ts          # Socket.IO server
│
├── components/
│   ├── ui/                       # Componentes genéricos (Button, Input, Modal...)
│   ├── vtt/
│   │   ├── MapCanvas.tsx         # Canvas do mapa com tokens
│   │   ├── TokenLayer.tsx
│   │   ├── DiceRoller.tsx
│   │   ├── InitiativeTracker.tsx
│   │   └── Chat.tsx
│   └── sheets/                   # Fichas por sistema
│       ├── OPSheet.tsx           # Ordem Paranormal
│       ├── DnD5eSheet.tsx        # D&D 5e
│       └── TDSheet.tsx           # Terra Devastada
│
├── lib/
│   ├── db.ts                     # Instância singleton do Prisma
│   ├── auth.ts                   # Config do NextAuth
│   ├── socket.ts                 # Config do Socket.IO (server)
│   ├── socket-client.ts          # Hook do Socket.IO (client)
│   └── validations/              # Schemas Zod
│       ├── campaign.ts
│       └── character.ts
│
├── prisma/
│   ├── schema.prisma             # Modelos do banco
│   └── migrations/               # Histórico de migrations
│
├── content/                      # Dados dos sistemas (JSON — read-only)
│   ├── ordem-paranormal/
│   │   ├── classes.json
│   │   ├── habilidades.json
│   │   ├── pericias.json
│   │   └── rituais.json
│   ├── dnd5e/
│   │   ├── classes.json          # Níveis 1-5 apenas
│   │   ├── spells.json
│   │   ├── equipment.json
│   │   └── races.json
│   └── terra-devastada/
│       ├── origens.json
│       ├── habilidades.json
│       └── equipamentos.json
│
├── public/
│   └── maps/                     # Imagens de mapas uploadadas
│
├── docker-compose.yml            # Orquestração dos containers
├── Dockerfile                    # Imagem do Next.js
├── .env.local                    # Variáveis de ambiente (não commitado)
├── .env.example                  # Exemplo de variáveis (commitado)
├── next.config.ts
├── prisma/schema.prisma
├── tailwind.config.ts
├── tsconfig.json
├── ARCHITECTURE.md
└── README.md
```

---

## Docker Compose

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://elfica:elfica@postgres:5432/biblioteca
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: http://localhost:3000
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./public/maps:/app/public/maps   # mapas persistidos fora do container

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: elfica
      POSTGRES_PASSWORD: elfica
      POSTGRES_DB: biblioteca
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U elfica"]
      interval: 5s
      timeout: 5s
      retries: 5

  pgadmin:                              # Interface visual pro banco (opcional, dev)
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@local.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    profiles: ["dev"]                   # Só sobe com: docker compose --profile dev up

volumes:
  postgres_data:
```

```dockerfile
# Dockerfile — multi-stage para imagem enxuta
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Modelo de Dados (Prisma + PostgreSQL)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id         String   @id @default(cuid())
  username   String   @unique
  email      String   @unique
  password   String                     // bcrypt hash
  createdAt  DateTime @default(now())

  ownedCampaigns Campaign[]             @relation("CampaignGM")
  memberships    CampaignMember[]
  characters     Character[]
}

model Campaign {
  id        String   @id @default(cuid())
  name      String
  system    SystemType
  inviteCode String  @unique @default(cuid())
  gmId      String
  createdAt DateTime @default(now())

  gm        User             @relation("CampaignGM", fields: [gmId], references: [id])
  members   CampaignMember[]
  characters Character[]
  sessions  GameSession[]
  maps      Map[]
}

enum SystemType {
  ORDEM_PARANORMAL
  DND5E
  TERRA_DEVASTADA
}

model CampaignMember {
  userId     String
  campaignId String
  joinedAt   DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id])
  campaign   Campaign @relation(fields: [campaignId], references: [id])

  @@id([userId, campaignId])
}

model Character {
  id         String     @id @default(cuid())
  name       String
  system     SystemType
  data       Json                       // JSONB — estrutura flexível por sistema
  userId     String
  campaignId String
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt

  user       User       @relation(fields: [userId], references: [id])
  campaign   Campaign   @relation(fields: [campaignId], references: [id])
}

model GameSession {
  id         String   @id @default(cuid())
  campaignId String
  date       DateTime @default(now())
  notes      String?                    // Markdown

  campaign   Campaign @relation(fields: [campaignId], references: [id])
  diceRolls  DiceRoll[]
}

model Map {
  id         String  @id @default(cuid())
  campaignId String
  name       String
  imagePath  String                     // caminho relativo em /public/maps
  gridSize   Int     @default(50)       // px por célula no grid
  tokens     Token[]

  campaign   Campaign @relation(fields: [campaignId], references: [id])
}

model Token {
  id          String  @id @default(cuid())
  mapId       String
  label       String
  x           Float
  y           Float
  size        Float   @default(1)       // 1 = 1 célula do grid
  color       String  @default("#4ade80")
  imagePath   String?
  hp          Int?
  maxHp       Int?

  map         Map     @relation(fields: [mapId], references: [id])
}

model DiceRoll {
  id        String      @id @default(cuid())
  sessionId String
  userId    String
  notation  String                     // ex: "2d6+3"
  results   Json                       // ex: { rolls: [4,2], modifier: 3, total: 9 }
  createdAt DateTime    @default(now())

  session   GameSession @relation(fields: [sessionId], references: [id])
}
```

---

## Fluxo de Uso

### Mestre
```
1. docker compose up -d
2. Abre http://localhost:3000 → cria conta (primeiro user vira GM automaticamente)
3. Cria uma Campanha → escolhe sistema (OP / D&D 5e / TD)
4. Copia o código de convite → envia pro grupo de WhatsApp
5. Sobe um mapa PNG, define grid
6. Posiciona tokens (um por personagem + monstros)
7. Clica "Iniciar Sessão" → todos caem no VTT
8. Controla fog of war, rola dados, usa chat
```

### Player
```
1. Abre http://192.168.1.10:3000 (IP do mestre)
2. Cria conta → entra na campanha com o código de convite
3. Cria a ficha do personagem (formulário guiado pelo sistema)
4. Aguarda o mestre iniciar → entra no VTT
5. Vê o mapa, move o próprio token, rola dados, usa chat
```

---

## Roadmap por Fases

### Fase 0 — Fundação
> Objetivo: projeto rodando do zero com `docker compose up`

- [ ] Criar projeto Next.js 14 com TypeScript + Tailwind
- [ ] Configurar Dockerfile e docker-compose.yml
- [ ] Conectar Prisma ao PostgreSQL
- [ ] Criar migrations iniciais
- [ ] Sistema de auth com NextAuth.js (usuário/senha)
- [ ] Middleware de proteção de rotas
- [ ] Páginas: Login, Register, Dashboard (esqueleto)

**O que você vai aprender:** Docker multi-stage build, variáveis de ambiente, Next.js App Router, autenticação com NextAuth, Prisma migrations.

---

### Fase 1 — Campanhas & Fichas
> Objetivo: mestre cria campanha, player entra e cria ficha

- [ ] CRUD de campanhas (criar, listar, arquivar)
- [ ] Endpoint para entrar com código de convite
- [ ] Página de lobby da campanha (membros, fichas, sessões)
- [ ] Ficha de **Ordem Paranormal** (formulário completo)
- [ ] Ficha de **D&D 5e** (níveis 1-5)
- [ ] Ficha de **Terra Devastada**
- [ ] Conteúdo dos sistemas em `/content/*.json`
- [ ] Validação de inputs com Zod

**O que você vai aprender:** Server Actions, API Routes, JSONB no Postgres, formulários controlados, validação com Zod, relacionamentos Prisma.

---

### Fase 2 — VTT Básico
> Objetivo: jogar uma sessão simples com mapa e dados

- [ ] Upload de mapas (imagem PNG/JPG → salva em volume Docker)
- [ ] Renderização do mapa com grid no canvas HTML5
- [ ] Tokens arrastáveis no mapa
- [ ] Socket.IO: sincronizar posição de tokens em tempo real
- [ ] Chat de mesa (texto + `/r 1d20+5` para rolar dados inline)
- [ ] Rolador de dados visual (d4, d6, d8, d10, d12, d20, d100)
- [ ] Histórico de rolls salvo no banco

**O que você vai aprender:** Socket.IO rooms, Canvas API, drag & drop, upload de arquivos no Next.js, WebSocket vs HTTP.

---

### Fase 3 — VTT Avançado
> Objetivo: sessão com experiência completa de mesa

- [ ] Fog of War (névoa revelada célula a célula pelo mestre)
- [ ] Iniciativa tracker (ordem de combate, botão de próximo turno)
- [ ] HP nos tokens (barra visual de vida)
- [ ] Condições/status nos tokens (envenenado, paralisado, etc.)
- [ ] Medição de distância no mapa
- [ ] Notas de sessão em Markdown (diário de campanha)

**O que você vai aprender:** Algoritmos de visibilidade, estado compartilhado via Socket, manipulação complexa de Canvas.

---

### Fase 4 — Polimento & Extras
> Objetivo: experiência refinada e conteúdo rico

- [ ] Tema visual élfico (fontes, cores, ornamentos)
- [ ] Compêndio in-app (consulta rápida de regras, magias, itens)
- [ ] Exportar ficha como PDF
- [ ] Backup/restauração de campanha (export JSON)
- [ ] Configurações de usuário (avatar, preferências)

---

## Conceitos que Você Vai Aprender (por fase)

```
Fase 0  │ Docker, Compose, Dockerfile multi-stage
        │ Next.js App Router, layouts, middleware
        │ NextAuth.js, bcrypt, sessões
        │ Prisma + PostgreSQL, migrations
        │
Fase 1  │ Server Actions vs API Routes
        │ JSONB (dados semiestruturados no Postgres)
        │ Zod — validação e inferência de tipos
        │ Formulários complexos em React
        │
Fase 2  │ WebSocket com Socket.IO
        │ Canvas API (renderização 2D)
        │ Upload de arquivos e volumes Docker
        │ Estado em tempo real (cliente ↔ servidor)
        │
Fase 3  │ Algoritmos de grid e visibilidade
        │ Estado distribuído (múltiplos clientes)
        │ Otimização de performance (Canvas, re-renders)
        │
Fase 4  │ Geração de PDF no servidor
        │ Temas e design system próprio
```

---

## Como Rodar

```bash
# 1. Copiar variáveis de ambiente
cp .env.example .env.local

# 2. Subir tudo
docker compose up -d

# 3. Rodar migrations (primeira vez)
docker compose exec app npx prisma migrate deploy

# 4. Acessar
# Mestre:  http://localhost:3000
# Players: http://<SEU-IP-LOCAL>:3000
# pgAdmin: http://localhost:5050  (só com --profile dev)
```

```bash
# Descobrir seu IP local
ip route get 1 | awk '{print $7}'   # Linux
ipconfig getifaddr en0              # macOS
ipconfig                            # Windows
```

```bash
# Desenvolvimento (hot reload, sem Docker)
npm run dev

# Ver logs dos containers
docker compose logs -f app
docker compose logs -f postgres

# Resetar banco (cuidado!)
docker compose down -v && docker compose up -d
```

---

## Sistemas de RPG — Escopo Inicial

### Ordem Paranormal
- Atributos: NEX, Esforço, Sanidade, HP, Defesa
- Perícias (todas as 15 do sistema)
- Poderes paranormais por NEX
- Rituais
- Origens e classes (Combatente, Especialista, Ocultista)

### Dungeons & Dragons 5e (Níveis 1–5 apenas)
- Atributos clássicos (FOR, DES, CON, INT, SAB, CAR)
- Raças, classes, antecedentes do SRD
- Magias (cantrips + níveis 1–3)
- Equipamentos e moedas
- Vantagem/desvantagem, saving throws, proficiency bonus

### Terra Devastada
- Atributos (Físico, Mental, Social)
- Origens pós-apocalípticas
- Habilidades especiais
- Equipamentos e sucata
- Sistema de stress e traumas
