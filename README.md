# Visual Reference Tool 🎨

Bem-vindo ao Visual Reference Tool! Uma ferramenta moderna e intuitiva para gerenciamento de referências visuais, paletas de cores e inspiração para designers e artistas.

## 🌟 Características Principais

- 🖼️ **Gerenciamento de Imagens**: Organize suas referências visuais com facilidade
- 🎨 **Paletas de Cores**: Crie e gerencie paletas de cores personalizadas
- 🏷️ **Sistema de Tags**: Categorize seu conteúdo de forma eficiente
- 📁 **Grupos**: Organize suas referências em grupos temáticos
- 🌓 **Modo Escuro/Claro**: Interface adaptável à sua preferência
- 🔍 **Busca Avançada**: Encontre rapidamente o que precisa

## 🚀 Começando

### Pré-requisitos

- Node.js 20+
- npm
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/visualreferencetool.git
cd visualreferencetool
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

5. Para rodar os testes rode o seguinte o comando:
```bash
npm run test
```

### Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
# OpenAI API Key para funcionalidades de extração de cores e geração de tags
OPENAI_API_KEY=sua_chave_api_aqui

# Google API para busca de imagens
GOOGLE_API_KEY=sua_chave_google_aqui
GOOGLE_SEARCH_ENGINE_ID=seu_search_engine_id_aqui
```

2. Como obter as chaves:
   - **OPENAI_API_KEY**: Obtenha em [OpenAI Platform](https://platform.openai.com/api-keys)
   - **GOOGLE_API_KEY** e **GOOGLE_SEARCH_ENGINE_ID**: 
     1. Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/)
     2. Ative a API de Busca Personalizada
     3. Crie uma chave de API
     4. Configure um mecanismo de busca em [Google Programmable Search Engine](https://programmablesearchengine.google.com/)

> ⚠️ **Importante**: Nunca compartilhe suas chaves de API ou as inclua no controle de versão.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas Next.js
├── components/            
│   ├── atoms/             # Componentes básicos (Button, Input, etc.)
│   ├── molecules/         # Composições de atoms (Card, Dialog, etc.)
│   ├── organisms/         # Componentes complexos (ImageGrid, PaletteGrid)
│   └── ui/                # Componentes base do shadcn/ui
├── hooks/                 # Custom hooks React
├── lib/                   # Utilitários e tipos
├── providers/             # Contextos React
└── styles/                # Estilos globais
```

## 🛠️ Stack Tecnológica

### Core
- **[Next.js 14](https://nextjs.org/)**: Framework React moderno
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)**: Utilitários CSS
- **[Shadcn/ui](https://ui.shadcn.com/)**: Componentes base

### Qualidade de Código
- **ESLint**: Linting com regras personalizadas
- **Prettier**: Formatação consistente
- **Jest & Testing Library**: Testes automatizados
- **SonarJS**: Análise de qualidade de código

## 🤖 Desenvolvimento com IA

Este projeto foi desenvolvido utilizando uma abordagem moderna de desenvolvimento assistido por IA:

1. **Início com Template v0 da Vercel**:
   - Começamos com um template básico do Next.js
   - Configuração inicial mínima e limpa
   - Base sólida para desenvolvimento

2. **Desenvolvimento Principal no Cursor**:
   - Maior parte do desenvolvimento realizado no [Cursor](https://cursor.sh/)
   - Pair programming com IA para:
     - Geração de código
     - Debugging
     - Refatoração
     - Testes automatizados

3. **Benefícios da Abordagem**:
   - Desenvolvimento mais rápido e eficiente
   - Código mais consistente
   - Melhor cobertura de testes
   - Documentação mais completa

## ⚠️ Limitações Conhecidas

1. **Armazenamento Local**:
   - Dados armazenados apenas no localStorage
   - Limite de armazenamento do navegador
   - Sem sincronização entre dispositivos

2. **Performance**:
   - Possível lentidão com muitas imagens
   - Limitações no processamento de cores
   - Carregamento inicial pode ser otimizado

3. **Compatibilidade**:
   - Melhor experiência em navegadores modernos
   - Algumas funcionalidades podem não funcionar em navegadores antigos

## 🔄 Possíveis Melhorias

1. **Armazenamento**:
   - Implementar backend com banco de dados
   - Suporte para upload de imagens
   - Sincronização em nuvem

2. **Performance**:
   - Implementar virtualização para listas grandes
   - Otimizar processamento de cores
   - Melhorar lazy loading de imagens

3. **Funcionalidades**:
   - Sistema de compartilhamento
   - Exportação de paletas
   - Integração com APIs de cores
   - Suporte para plugins

4. **UX/UI**:
   - Mais opções de visualização
   - Atalhos de teclado
   - Interface customizável
   - Temas personalizados

## 📚 Documentação Adicional

- [Design do Sistema](./SYSTEM_DESIGN.md)
- Disponibilizo um vídeo `demo.mp4` demonstrativo na raiz do projeto sobre as funcionalidades da aplicação.

## 🙏 Agradecimentos

- [Vercel](https://vercel.com) pelo template inicial
- [Shadcn](https://ui.shadcn.com/) pelos componentes base
- [Cursor](https://cursor.sh/) pela excelente IDE com IA
