# biblioteca-elfica

VTT (Virtual Tabletop) local-first para campanhas de RPG.
Roda na rede local (LAN) — sem internet necessária durante a sessão.

**Sistemas suportados:** Ordem Paranormal · D&D 5e (nível 1–5) · Terra Devastada

---

## Estrutura

```
biblioteca-elfica/
├── web/        ← Next.js 14 (frontend + API Routes + auth)
├── socket/     ← Express + Socket.IO (tempo real: mapa, dados, chat)
├── docker-compose.yml      ← produção
├── docker-compose.dev.yml  ← desenvolvimento (hot reload)
└── .env.example
```

---

## Começando

### 1. Variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` se quiser trocar senhas. Para gerar um `NEXTAUTH_SECRET` seguro:

```bash
openssl rand -base64 32
```

### 2. Criar os projetos (primeira vez)

```bash
# Next.js
cd web
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Express + Socket.IO
cd ../socket
npm init -y
npm install express socket.io cors dotenv
npm install -D nodemon @types/node typescript
```

### 3. Subir os containers

```bash
# Desenvolvimento (hot reload, banco exposto na porta 5432, pgAdmin incluso)
docker compose -f docker-compose.dev.yml up -d

# Produção
docker compose up -d
```

### 4. Rodar migrations (primeira vez ou após mudanças no schema)

```bash
# Dentro do container
docker compose exec web npx prisma migrate dev

# Ou direto da máquina (com o banco exposto na dev)
cd web && npx prisma migrate dev
```

### 5. Acessar

| Serviço    | URL                            |
|------------|--------------------------------|
| Site       | http://localhost:3000          |
| Socket     | http://localhost:3001          |
| pgAdmin    | http://localhost:5050          |
| Banco      | postgresql://localhost:5432    |

**Players na mesma rede:**
```bash
# Descobrir seu IP local
ip route get 1 | awk '{print $7}'   # Linux
ipconfig getifaddr en0              # macOS
ipconfig                            # Windows

# Players acessam:
# http://<SEU-IP>:3000
```

---

## Comandos úteis

```bash
# Ver logs em tempo real
docker compose logs -f web
docker compose logs -f socket
docker compose logs -f postgres

# Parar tudo
docker compose down

# Parar e apagar o banco (cuidado!)
docker compose down -v

# Rebuild de um serviço específico
docker compose build web
docker compose up -d --no-deps web
```

---

## Documentação

- [ARCHITECTURE.md](./ARCHITECTURE.md) — stack, modelo de dados, roadmap completo
