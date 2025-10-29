# 🌐 Sistema de Tradução - DarkVoice

Este documento explica como funciona o sistema de tradução do DarkVoice, que combina **tradução manual (i18n)** com **tradução automática (LibreTranslate)** e **compatibilidade com Google Tradutor do navegador**.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Tradução Manual (i18n)](#tradução-manual-i18n)
3. [Tradução Automática (LibreTranslate)](#tradução-automática-libretranslate)
4. [Google Tradutor do Navegador](#google-tradutor-do-navegador)
5. [Como Adicionar Novos Textos](#como-adicionar-novos-textos)
6. [FAQ](#faq)

---

## 🎯 Visão Geral

O DarkVoice usa **3 métodos de tradução** para garantir que todo conteúdo seja acessível em **PT-BR, EN e ES**:

| Método | Quando Usar | Vantagens | Desvantagens |
|--------|-------------|-----------|--------------|
| **i18n Manual** | Textos principais (Home, Login, Members) | Alta qualidade, controle total | Trabalhoso para atualizar |
| **LibreTranslate** | Textos novos sem tradução manual | Automático, grátis, open-source | Qualidade média |
| **Google Tradutor** | Qualquer texto não traduzido | Funciona sem código, alta qualidade | Depende do usuário ativar |

---

## 📝 Tradução Manual (i18n)

### Como Funciona

Os textos principais estão em arquivos JSON:

```
client/src/locales/
├── pt-BR.json  (Português - Padrão)
├── en.json     (Inglês)
└── es.json     (Espanhol)
```

### Exemplo de Uso

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('home.hero.title')}</h1>
  );
}
```

### Adicionar Nova Tradução Manual

1. **Adicione a chave em `pt-BR.json`:**
```json
{
  "home": {
    "new_section": {
      "title": "Novo Título",
      "description": "Nova descrição"
    }
  }
}
```

2. **Adicione em `en.json`:**
```json
{
  "home": {
    "new_section": {
      "title": "New Title",
      "description": "New description"
    }
  }
}
```

3. **Adicione em `es.json`:**
```json
{
  "home": {
    "new_section": {
      "title": "Nuevo Título",
      "description": "Nueva descripción"
    }
  }
}
```

4. **Use no código:**
```tsx
<h1>{t('home.new_section.title')}</h1>
<p>{t('home.new_section.description')}</p>
```

---

## 🤖 Tradução Automática (LibreTranslate)

### Como Funciona

Quando você adiciona um texto em português **sem tradução manual**, o sistema traduz automaticamente usando a API do LibreTranslate (open-source, gratuita).

### Exemplo de Uso

```tsx
import { useAutoTranslate } from '@/hooks/useAutoTranslate';

function MyComponent() {
  const { text, isLoading } = useAutoTranslate('Texto em português');
  
  return (
    <p>{isLoading ? 'Traduzindo...' : text}</p>
  );
}
```

### Versão Simplificada

```tsx
import { useAutoTranslateText } from '@/hooks/useAutoTranslate';

function MyComponent() {
  const text = useAutoTranslateText('Texto em português');
  
  return <p>{text}</p>;
}
```

### Cache Automático

- Traduções são **cacheadas no localStorage** por **30 dias**
- Economiza requisições à API
- Funciona offline após primeira tradução

### Limpar Cache

```tsx
import { clearTranslationCache } from '@/utils/autoTranslate';

// Limpar todo o cache de traduções
clearTranslationCache();
```

---

## 🌍 Google Tradutor do Navegador

### Como Funciona

O sistema é **100% compatível** com o Google Tradutor do Chrome/Edge/Firefox. Basta o usuário:

1. Clicar com botão direito na página
2. Selecionar "Traduzir para [idioma]"
3. O navegador traduz automaticamente

### Implementação Técnica

O atributo `lang` do HTML é atualizado dinamicamente:

```tsx
// App.tsx
const { i18n } = useTranslation();

useEffect(() => {
  document.documentElement.lang = i18n.language;
}, [i18n.language]);
```

Isso garante que o Google Tradutor:
- Detecte o idioma correto
- Traduza apenas textos não traduzidos
- Respeite o idioma selecionado pelo usuário

---

## ➕ Como Adicionar Novos Textos

### Opção 1: Tradução Manual (Recomendado para textos importantes)

1. Adicione nos 3 arquivos JSON (pt-BR, en, es)
2. Use `t('chave')` no código
3. **Vantagem:** Alta qualidade, controle total

### Opção 2: Tradução Automática (Rápido para textos secundários)

1. Use `useAutoTranslate('Texto em português')`
2. **Vantagem:** Não precisa editar JSON, traduz automaticamente

### Opção 3: Deixar para o Google Tradutor (Mais simples)

1. Adicione o texto direto no código em português
2. Usuário traduz com Google Tradutor do navegador
3. **Vantagem:** Zero trabalho, funciona para qualquer idioma

---

## 🎨 Exemplo Completo

```tsx
import { useTranslation } from 'react-i18next';
import { useAutoTranslate } from '@/hooks/useAutoTranslate';

function ExamplePage() {
  const { t } = useTranslation();
  
  // Tradução manual (alta qualidade)
  const title = t('example.title');
  
  // Tradução automática (rápido)
  const { text: subtitle } = useAutoTranslate('Subtítulo em português');
  
  // Texto direto (Google Tradutor do navegador)
  const note = 'Nota: Este texto será traduzido pelo navegador';
  
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{note}</p>
    </div>
  );
}
```

---

## ❓ FAQ

### 1. Qual método devo usar?

- **Textos principais** (Home, Login, Formulários): **i18n Manual**
- **Textos secundários** (Descrições, Avisos): **LibreTranslate**
- **Textos raros/temporários**: **Google Tradutor do navegador**

### 2. LibreTranslate é grátis?

Sim! Usamos a instância pública oficial (https://libretranslate.com) que é **100% gratuita e open-source**.

### 3. Tem limite de requisições?

A API pública tem rate-limit, mas o **cache de 30 dias** reduz drasticamente as requisições.

### 4. Posso usar outra API de tradução?

Sim! Edite `client/src/utils/autoTranslate.ts` e troque a URL da API:

```ts
const LIBRETRANSLATE_API = 'https://sua-api.com/translate';
```

### 5. Como desabilitar tradução automática?

```tsx
const { text } = useAutoTranslate('Texto', { enabled: false });
```

### 6. Como forçar atualização de tradução?

```tsx
import { clearTranslationCache } from '@/utils/autoTranslate';

// Limpar cache e forçar nova tradução
clearTranslationCache();
window.location.reload();
```

---

## 🚀 Próximos Passos

- [ ] Adicionar mais idiomas (FR, DE, IT)
- [ ] Integrar DeepL API (qualidade superior)
- [ ] Criar painel admin para gerenciar traduções
- [ ] Exportar/importar traduções em CSV

---

## 📞 Suporte

Se tiver dúvidas sobre o sistema de tradução, consulte:
- [Documentação i18next](https://react.i18next.com/)
- [LibreTranslate API](https://libretranslate.com/docs/)
- [Google Translate Element](https://translate.google.com/manager/website/)

---

**Desenvolvido com ❤️ para DarkVoice**

