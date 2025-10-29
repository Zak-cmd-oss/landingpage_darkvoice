# DarkVoice Landing Page

Landing page oficial do DarkVoice - Sistema de transformação de voz com IA.

## 🚀 Sobre o Projeto

Este é o código-fonte da landing page do DarkVoice, uma aplicação React moderna construída com Vite, TypeScript e Tailwind CSS.

## 📋 Características

- ✅ Landing page responsiva e moderna
- ✅ Sistema de captura de leads
- ✅ Suporte multilíngue (pt-BR, en, es)
- ✅ Tema dark otimizado
- ✅ Componentes UI com Radix UI
- ✅ Animações com Framer Motion
- ✅ Formulários com React Hook Form

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Radix UI** - Componentes acessíveis
- **Framer Motion** - Animações
- **i18next** - Internacionalização
- **React Hook Form** - Gerenciamento de formulários
- **Wouter** - Roteamento leve

## 📦 Instalação

```bash
# Instalar dependências
pnpm install

# ou
npm install
```

## 🚀 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# ou
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🏗️ Build

```bash
# Criar build de produção
pnpm build

# ou
npm run build
```

Os arquivos compilados estarão em `dist/`

## 📁 Estrutura do Projeto

```
darkvoice-nextjs/
├── client/
│   ├── public/          # Arquivos estáticos
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── contexts/    # Contexts (Theme)
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Bibliotecas e configurações
│   │   ├── locales/     # Traduções
│   │   ├── pages/       # Páginas (Home, NotFound)
│   │   ├── styles/      # Estilos globais
│   │   ├── App.tsx      # Componente principal
│   │   └── main.tsx     # Entry point
│   └── index.html       # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Captura de Leads

A landing page possui um formulário de captura de leads integrado. 

### Modo Desenvolvimento

Em desenvolvimento, os leads são salvos no `localStorage` do navegador para testes.

### Modo Produção

Para integrar com seu backend em produção:

1. Configure a URL da API em `client/src/lib/api.ts`
2. Implemente o endpoint `/backend/capture-lead` no seu servidor
3. O endpoint deve aceitar POST com JSON:

```json
{
  "name": "Nome do Lead",
  "email": "email@exemplo.com",
  "whatsapp": "+5511999999999"
}
```

## 🌍 Internacionalização

O projeto suporta múltiplos idiomas:

- Português Brasileiro (pt-BR) - Padrão
- Inglês (en)
- Espanhol (es)

As traduções estão em `client/src/locales/`

## 🎯 Deploy

### Opções de Hospedagem

- **Vercel** (Recomendado)
- **Netlify**
- **GitHub Pages**
- **Servidor próprio** (Apache/Nginx)

### Configuração para SPA

Se hospedar em servidor próprio, configure o servidor para redirecionar todas as rotas para `index.html`:

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [QSA,L]
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 📝 Licença

MIT

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ para o projeto DarkVoice

---

**Observação:** Este projeto contém apenas o frontend. Para funcionalidade completa de captura de leads, você precisará implementar um backend próprio.
