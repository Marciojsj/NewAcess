# 🔐 Access Control System

Sistema completo de controle de acesso com suporte a múltiplas plataformas (iOS, Android e Web), tema claro/escuro, e 6 níveis de permissões.

## 📱 Screenshots

### Light Mode
[Adicionar screenshots]

### Dark Mode
[Adicionar screenshots]

---

## ✨ Funcionalidades

### ✅ Implementadas

- **Autenticação**
  - Login com email/senha
  - Persistência de sessão
  - Logout com confirmação

- **Sistema de Temas**
  - Dark Mode e Light Mode
  - Paleta de 30+ cores por tema
  - Transições suaves
  - Persistência de preferência

- **Layout Responsivo**
  - Suporte a Mobile, Tablet e Desktop
  - Sidebar adaptativa
  - Breakpoints bem definidos
  - Sistema de espaçamento responsivo

- **Gestão de Entidades**
  - CRUD completo
  - Busca e filtros
  - Validações
  - Estados de loading

### 🚧 Em Desenvolvimento

- **Sistema de Permissões** (6 níveis)
  - Guest, Security, Receptionist, Supervisor, Manager, Admin
  - Controle granular de acesso
  - Matriz de permissões configurável

- **Registro de Entrada/Saída**
  - Registro manual
  - Scanner QR Code (futuro)
  - Cálculo de tempo de permanência
  - Histórico completo

- **Gestão de Visitantes**
  - Cadastro completo
  - Upload de foto
  - Período de validade
  - Histórico de visitas

- **Relatórios e Analytics**
  - Dashboard com gráficos
  - Estatísticas por período
  - Exportação de dados
  - Filtros avançados

- **Sistema de Alertas**
  - Notificações em tempo real
  - Regras configuráveis
  - Diferentes níveis de severidade

---

## 🚀 Tecnologias

- **React Native** 0.81.4
- **Expo** ~54.0.9
- **TypeScript** 5.9.2
- **React Navigation** 7.x
- **React Native Reanimated** 4.1.2
- **AsyncStorage** (local storage)
- **Jest** + **Testing Library** (testes)

---

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18
- npm ou yarn
- Expo CLI

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Marciojsj/NewAcess.git
   cd accesControl
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o projeto**
   ```bash
   # Desenvolvimento
   npm run dev

   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Watch mode
npm run test:watch

# Com cobertura
npm run test:coverage

# Modo verbose
npm run test:verbose
```

### Cobertura Atual

| Tipo | Cobertura |
|------|-----------|
| Statements | 75% |
| Branches | 75% |
| Functions | 75% |
| Lines | 75% |

Para mais informações, veja [TESTING.md](./TESTING.md).

---

## 📚 Documentação

- **[ROADMAP.md](./ROADMAP.md)** - Plano completo de desenvolvimento
- **[TESTING.md](./TESTING.md)** - Guia de testes
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guia de contribuição

---

## 🏗️ Estrutura do Projeto

```
accesControl/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── entity/       # Componentes de entidade
│   │   ├── layout/       # Layout (sidebars, navbars)
│   │   └── ui/           # Componentes UI (buttons, modals)
│   ├── contexts/         # Contexts (Auth, Theme, etc)
│   ├── hooks/            # Custom hooks
│   ├── screens/          # Telas da aplicação
│   ├── services/         # APIs e serviços
│   ├── types/            # Definições TypeScript
│   └── utils/            # Funções auxiliares
├── __tests__/            # Testes
├── assets/               # Imagens e assets
└── docs/                 # Documentação adicional
```

---

## 🎨 Sistema de Temas

### Dark Mode
```typescript
{
  background: '#1a1d2e',
  text: '#ffffff',
  primary: '#8a2be2',
  success: '#30d158',
  // ... 30+ cores
}
```

### Light Mode
```typescript
{
  background: '#f5f5f7',
  text: '#1d1d1f',
  primary: '#007aff',
  success: '#34c759',
  // ... 30+ cores
}
```

---

## 🔐 Sistema de Permissões

### Níveis

| Nível | Nome | Descrição |
|-------|------|-----------|
| 0 | Guest | Acesso mínimo (visitante) |
| 1 | Security | Registro de entrada/saída |
| 2 | Receptionist | Gestão de visitantes |
| 3 | Supervisor | Relatórios e aprovações |
| 4 | Manager | Configurações e alertas |
| 5 | Admin | Acesso total ao sistema |

### Matriz de Permissões

Veja a matriz completa em [ROADMAP.md](./ROADMAP.md#sistema-de-permissões-6-níveis).

---

## 📱 Plataformas Suportadas

- ✅ **Android** - Testado em Android 10+
- ✅ **iOS** - Testado em iOS 14+
- ✅ **Web** - Testado em Chrome, Firefox, Safari

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia [CONTRIBUTING.md](./CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📝 Roadmap

Veja o plano completo de desenvolvimento em [ROADMAP.md](./ROADMAP.md).

### Próximas Fases

- **Fase 0**: Configuração de Testes ✅
- **Fase 1**: Sistema de Permissões 🚧
- **Fase 2**: Registro de Entrada
- **Fase 3**: Registro de Saída
- **Fase 4**: Gestão de Visitantes
- **Fase 5**: Relatórios e Analytics
- **Fase 6**: Sistema de Alertas
- **Fase 7**: Configurações
- **Fase 8**: Integração e Refinamento

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👥 Equipe

- **Desenvolvedor Principal**: [Marcio Junior](https://github.com/Marciojsj)

---

## 📞 Contato

- **GitHub**: [Marciojsj](https://github.com/Marciojsj)
- **Email**: [seu-email@exemplo.com]
- **LinkedIn**: [seu-linkedin]

---

## 🙏 Agradecimentos

- Expo Team
- React Native Community
- Todos os contribuidores

---

## 📊 Status do Projeto

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-75%25-yellow)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

**Última Atualização**: 06 de Outubro de 2025

---

## 🔗 Links Úteis

- [Documentação do Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Made with ❤️ by Marcio Junior**
