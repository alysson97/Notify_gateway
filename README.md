# Notify Gateway

Gateway escalável de notificações em tempo real com NestJS, WebSockets e Redis.

## Funcionalidades

- **WebSocket em Tempo Real**: Comunicação bidirecional instantânea via Socket.IO
- **Autenticação JWT**: Validação segura de tokens no handshake WebSocket
- **Escalabilidade com Redis**: Sincronização de mensagens entre múltiplas instâncias
- **Tratamento Global de Erros**: Filter centralizado para exceções WebSocket
- **Decorators Customizados**: Injeção elegante de dados do usuário
- **CORS Habilitado**: Pronto para desenvolvimento e integração
- **TypeScript Strict Mode**: Type-safety em todo o código

## Guia de Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. Clonar o repositório e instalar dependências:

```bash
git clone <repositório>
cd Notify_gateway
npm install
```

2. Compilar TypeScript (opcional):

```bash
npm run build
```

3. Executar em desenvolvimento:

```bash
npm run dev
```

4. Executar em produção:

```bash
npm run build
npm start
```

### Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```
JWT_SECRET=your-secret-key
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Uso Rápido

### Gerar Token JWT

```bash
node generate-token.js
```

### Testar com Cliente

```bash
node client-example.js
```

Use o token gerado na configuração `auth` do cliente Socket.IO.

## Tecnologias

- **NestJS 11** - Framework Node.js progressivo
- **Socket.IO** - Biblioteca WebSocket
- **Redis** - Message broker para escalabilidade
- **JWT** - Autenticação segura
- **Passport** - Estratégia de autenticação
- **TypeScript** - Linguagem com type-safety
