# Biblioteca Élfica — Arquitetura & Roadmap

> VTT (Virtual Tabletop) local-first para campanhas de RPG.
> Roda na rede local (LAN), sem dependência de internet.

---

## Visão Geral

```
┌─────────────────────────────────────────────────────────┐
│                    REDE LOCAL (LAN)                      │
│                                                          │
│   ┌─────────┐      ┌──────────────────────────────┐     │
│   │ Mestre  │─────▶│     Servidor (Node.js)        │     │
│   │(browser)│      │  - Auth (sessões locais)      │     │
│   └─────────┘      │  - REST API / WebSocket       │     │
│                    │  - SQLite (banco de dados)    │     │
│   ┌─────────┐      │  - Arquivos estáticos         │     │
│   │ Player 1│─────▶│                              │     │
│   │(browser)│      └──────────────────────────────┘     │
│   └─────────┘                                            │
│   ┌─────────┐                                            │
│   │ Player 2│                                            │
│   │(browser)│                                            │
│   └─────────┘                                            │
└─────────────────────────────────────────────────────────┘
```

Todos os dispositivos acessam o mesmo servidor via IP local (ex: `192.168.1.10:3000`).
O mestre sobe o servidor na máquina dele, os players abrem o navegador e entram.

---

## Stack Tecnológica

| Camada       | Tecnologia          | Justificativa                                      |
|--------------|---------------------|----------------------------------------------------|
| Frontend     | React + Vite        | SPA rápida, componentes reutilizáveis para fichas  |
| Estilo       | Tailwind CSS        | Estilização ágil, dark mode nativo                 |
| Backend      | Node.js + Express   | Leve, fácil de rodar localmente, JS fullstack      |
| Tempo real   | Socket.IO           | WebSocket para sincronizar VTT, chat, dados        |
| Banco        | SQLite (via Prisma) | Arquivo único, zero configuração, portátil         |
| Auth         | express-session     | Sessões simples, sem JWT, local-first              |
| Build/Deploy | script npm start    | Um comando para subir tudo                        |

---

## Estrutura de Pastas

```
biblioteca-elfica/
├── server/                  # Backend Node.js
│   ├── src/
│   │   ├── index.ts         # Entrada, Express + Socket.IO
│   │   ├── routes/
│   │   │   ├── auth.ts      # Login, logout, register
│   │   │   ├── campaigns.ts # CRUD de campanhas
│   │   │   ├── characters.ts# CRUD de fichas
│   │   │   └── rooms.ts     # Gerenciar salas VTT
│   │   ├── socket/
│   │   │   ├── vtt.ts       # Eventos do mapa (tokens, fog, etc.)
│   │   │   ├── dice.ts      # Rolagem de dados sincronizada
│   │   │   └── chat.ts      # Chat da mesa
│   │   ├── db/
│   │   │   └── schema.prisma# Modelos do banco
│   │   └── systems/         # Regras específicas de cada sistema
│   │       ├── ordem-paranormal/
│   │       ├── dnd5e/
│   │       └── terra-devastada/
│   └── package.json
│
├── client/                  # Frontend React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx      # Hub do mestre/player
│   │   │   ├── CampaignLobby.tsx  # Sala de espera da campanha
│   │   │   ├── VTT.tsx            # Mesa virtual (mapa + tokens)
│   │   │   └── CharacterSheet.tsx # Ficha do personagem
│   │   ├── components/
│   │   │   ├── DiceRoller.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── TokenLayer.tsx     # Tokens no mapa
│   │   │   └── sheets/            # Componentes de ficha por sistema
│   │   │       ├── OPSheet.tsx
│   │   │       ├── DnD5eSheet.tsx
│   │   │       └── TDSheet.tsx
│   │   └── lib/
│   │       └── socket.ts          # Singleton do Socket.IO client
│   └── package.json
│
├── content/                 # Dados dos sistemas (JSON estático)
│   ├── ordem-paranormal/
│   │   ├── classes.json
│   │   ├── habilidades.json
│   │   ├── pericias.json
│   │   └── rituais.json
│   ├── dnd5e/
│   │   ├── classes.json     # Apenas níveis 1-5
│   │   ├── spells.json
│   │   ├── equipment.json
│   │   └── races.json
│   └── terra-devastada/
│       ├── origens.json
│       ├── habilidades.json
│       └── equipamentos.json
│
├── ARCHITECTURE.md          # Este arquivo
└── README.md
```

---

## Modelo de Dados (Banco)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String   # hash bcrypt
  role      String   # "gm" | "player"
  campaigns CampaignMember[]
  characters Character[]
}

model Campaign {
  id        Int      @id @default(autoincrement())
  name      String
  system    String   # "ordem-paranormal" | "dnd5e" | "terra-devastada"
  gmId      Int
  members   CampaignMember[]
  sessions  Session[]
  characters Character[]
  maps      Map[]
}

model CampaignMember {
  userId     Int
  campaignId Int
  user       User     @relation(fields: [userId], references: [id])
  campaign   Campaign @relation(fields: [campaignId], references: [id])
  @@id([userId, campaignId])
}

model Character {
  id         Int      @id @default(autoincrement())
  name       String
  system     String
  data       String   # JSON com a ficha completa (flexível por sistema)
  userId     Int
  campaignId Int
  user       User     @relation(fields: [userId], references: [id])
  campaign   Campaign @relation(fields: [campaignId], references: [id])
}

model Session {
  id         Int      @id @default(autoincrement())
  campaignId Int
  date       DateTime @default(now())
  notes      String?
  campaign   Campaign @relation(fields: [campaignId], references: [id])
}

model Map {
  id         Int    @id @default(autoincrement())
  campaignId Int
  name       String
  imageUrl   String  # caminho local para a imagem do mapa
  tokens     Token[]
  campaign   Campaign @relation(fields: [campaignId], references: [id])
}

model Token {
  id       Int    @id @default(autoincrement())
  mapId    Int
  name     String
  x        Float
  y        Float
  imageUrl String?
  map      Map    @relation(fields: [mapId], references: [id])
}
```

---

## Fluxo de Uso

### Mestre
```
1. Abre o navegador → http://localhost:3000
2. Cria conta ou loga como GM
3. Cria uma Campanha (escolhe o sistema: OP, D&D, TD)
4. Obtém o link/código da sala → envia pros players
5. Sobe um mapa, posiciona tokens
6. Inicia a sessão → todos entram na mesma tela do VTT
7. Rola dados, controla fog of war, usa chat
```

### Player
```
1. Abre o navegador → http://192.168.1.10:3000 (IP do mestre)
2. Cria conta ou loga
3. Entra na campanha com o código/convite do mestre
4. Cria a ficha do personagem (formulário guiado pelo sistema)
5. Entra na sala VTT quando o mestre iniciar
6. Vê o mapa, move o próprio token, rola dados, usa chat
```

---

## Roadmap por Fases

### Fase 0 — Fundação (1-2 semanas)
- [ ] Setup do monorepo (server + client)
- [ ] Banco de dados com Prisma + SQLite
- [ ] Sistema de autenticação (registro/login/logout)
- [ ] Dashboard básico pós-login
- [ ] Scripts para rodar local (`npm start` sobe tudo)

### Fase 1 — Campanhas & Fichas (2-3 semanas)
- [ ] CRUD de campanhas (criar, listar, deletar)
- [ ] Sistema de convite/entrada por código
- [ ] Ficha de Ordem Paranormal (completa)
- [ ] Ficha de D&D 5e (níveis 1-5)
- [ ] Ficha de Terra Devastada
- [ ] Conteúdo estático dos 3 sistemas em JSON

### Fase 2 — VTT Básico (2-3 semanas)
- [ ] Upload de mapas (imagem PNG/JPG)
- [ ] Tokens no mapa (arrastar, redimensionar)
- [ ] Sincronização em tempo real via Socket.IO
- [ ] Chat de mesa (texto + rolagem de dados inline)
- [ ] Rolador de dados (d4, d6, d8, d10, d12, d20, d100)

### Fase 3 — VTT Avançado (3-4 semanas)
- [ ] Fog of War (névoa de guerra controlada pelo mestre)
- [ ] Medição de distância no mapa
- [ ] Iniciativa tracker (ordem de combate)
- [ ] Condições/status nos tokens
- [ ] Notas de sessão (diário de campanha)

### Fase 4 — Polimento (ongoing)
- [ ] Temas visuais (tema élfico/fantasia)
- [ ] Exportar/importar ficha em PDF
- [ ] Compêndio in-app (consulta rápida de regras)
- [ ] Histórico de rolagens por sessão
- [ ] Backup/exportação da campanha completa

---

## Decisões de Design

### Por que local-first?
- Sem latência de internet durante a sessão
- Dados ficam com o usuário (privacidade)
- Funciona sem roteador com internet (só LAN)
- Sem custos de hospedagem

### Por que SQLite?
- Banco inteiro é um único arquivo `.db`
- Fácil de fazer backup (só copiar o arquivo)
- Zero configuração de servidor de banco
- Suporta tranquilamente o volume de uma mesa de RPG

### Por que JSON para fichas?
- Cada sistema de RPG tem estrutura de ficha muito diferente
- Campo `data: String (JSON)` permite flexibilidade total
- Facilita adicionar novos sistemas no futuro

### Por que Socket.IO e não polling?
- VTT exige sincronização em tempo real (tokens movendo, dados rolando)
- Socket.IO tem fallback automático para polling se WebSocket falhar
- Suporte nativo a salas (rooms) — ideal para separar campanhas

---

## Como Rodar (futuro)

```bash
# Instalar dependências
npm install

# Configurar banco
npm run db:migrate

# Iniciar servidor (expõe na LAN automaticamente)
npm start

# Players acessam via:
# http://<IP-DO-MESTRE>:3000
```

Para descobrir o IP local:
```bash
# Linux/Mac
ip addr | grep "192.168"
# Windows
ipconfig
```

---

## Sistemas de RPG — Escopo Inicial

### Ordem Paranormal
- Atributos: NEX, Esforço, Sanidade, HP, Defesa
- Perícias (todas as 15)
- Poderes paranormais por NEX
- Rituais
- Origens e classes (Combatente, Especialista, Ocultista)

### Dungeons & Dragons 5e (Níveis 1-5)
- Atributos clássicos (FOR, DES, CON, INT, SAB, CAR)
- Raças, classes, antecedentes
- Magias (cantrips + níveis 1-3)
- Equipamentos e moedas
- Vantagem/desvantagem

### Terra Devastada
- Atributos (Físico, Mental, Social)
- Origens pós-apocalípticas
- Habilidades especiais
- Equipamentos e sucata
- Sistema de stress e traumas
