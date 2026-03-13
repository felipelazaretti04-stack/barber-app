# Instalação e Configuração

## 1. Instalar Dependências

```bash
npm install @supabase/supabase-js
```

## 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do Supabase:

```
EXPO_PUBLIC_SUPABASE_URL=sua_url_do_projeto_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

## 3. Obter Credenciais do Supabase

1. Acesse https://supabase.com
2. Faça login ou crie uma conta
3. Crie um novo projeto
4. Vá em Settings > API
5. Copie:
   - Project URL (EXPO_PUBLIC_SUPABASE_URL)
   - anon/public key (EXPO_PUBLIC_SUPABASE_ANON_KEY)

## 4. Migrations Já Aplicadas

As migrations já foram aplicadas no Supabase. O banco de dados está pronto com:

- Tabelas criadas
- RLS configurado
- Seed data inserido
- Indexes criados

## 5. Iniciar o Projeto

```bash
# Mobile
npm start

# Web
npm run web
```

## 6. Verificar Dados no Supabase

Acesse o Supabase Dashboard:
- Table Editor para ver os dados
- SQL Editor para queries customizadas
- Auth para gerenciar autenticação (futuro)

## 7. Modo Offline/Mock

O app funciona em dois modos:

**Com Supabase** (recomendado):
- Configure as variáveis de ambiente
- Os dados virão do banco real

**Sem Supabase** (desenvolvimento):
- Deixe as variáveis vazias ou não configure
- Os dados virão de `src/data/mock.ts`

## 8. Estrutura de Pastas

```
src/
├── components/      # Componentes reutilizáveis
├── constants/       # Theme e constantes
├── data/           # Dados mock
├── lib/            # Cliente Supabase
├── services/       # Lógica de negócio
└── types/          # TypeScript types
```

## 9. Próximos Passos

- Adicionar autenticação (opcional)
- Implementar upload de fotos
- Adicionar notificações
- Implementar relatórios avançados
