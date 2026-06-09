# 🗺️ Passaporte Virtual de Pontos Turísticos

Front-end acadêmico em Next.js 14 (Pages Router) para o sistema de Passaporte Virtual.

## Stack

- **Next.js 14** — Pages Router
- **JavaScript puro** — sem TypeScript
- **CSS Modules** — sem Tailwind ou Styled Components
- **Axios** — requisições HTTP com interceptor JWT
- **Zustand** — estado global de autenticação
- **TanStack Query v5** — cache e fetch de dados

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## Variáveis de ambiente

Crie `.env.local` na raiz:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## Estrutura

```
/pages          — Páginas (Pages Router)
  _app.js       — Provider global (QueryClient)
  _document.js  — HTML base + Google Fonts
  index.js      — Redirect automático
  login.js      — Autenticação
  signup.js     — Cadastro
  dashboard.js  — Painel do usuário
  checkin.js    — Check-in por código
  passaporte.js — Coleção pessoal
  perfil.js     — Perfil do usuário
  /locais
    index.js    — Lista de locais
    [id].js     — Detalhes do local

/components     — Componentes reutilizáveis
  Layout.js     — Wrapper com sidebar/navbar/footer
  Sidebar.js    — Navegação lateral
  Navbar.js     — Barra superior
  Footer.js     — Rodapé
  CardTuristico.js — Card de local turístico
  Avatar.js     — Avatar + Button + Input + Modal + Loader + EmptyState + RatingStars + CardEstatistica

/services
  api.js        — Axios + interceptor JWT
  authService.js
  locaisService.js
  checkinService.js
  mockData.js   — Dados mockados para demo

/store
  authStore.js  — Zustand: user, token, login(), logout()

/styles         — CSS Modules de cada componente/página
```

## Dados mock

Todos os serviços têm fallback para dados mockados, então o sistema funciona visualmente mesmo sem o backend.

## Conectar ao backend

Basta ajustar `NEXT_PUBLIC_API_URL` no `.env.local` para a URL do backend real.
Os serviços já estão prontos para receber as respostas da API.

## Deploy (Vercel)

```bash
vercel deploy
```
