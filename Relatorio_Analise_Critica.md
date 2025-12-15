# 📘 Relatório de Análise Crítica do Projeto 👨‍💻

## 1. Informações do grupo
- **🎓 Curso:** Engenharia de Software
- **📘 Disciplina:** Laboratório de Desenvolvimento de Software
- **🗓 Período:** 4° Período
- **👨‍🏫 Professor(a):** Prof. Dr. João Paulo Carneiro Aramuni
- **👥 Membros do Grupo:** Arthur Araujo Mendonca, Eddie Christian Pereira, Pedro Queiroz Rolim

---

## 📌 2. Identificação do Projeto
- **Nome do projeto:** Sistema de Moeda Estudantil
- **Integrantes do outro grupo:** Breno de Oliveira Brandão, Nicolas Almeida Prado da Silva, Pedro Augusto Santos Seabra
- **Link do repositório:** https://github.com/pedroseabra27/Sistema-de-Moeda-Estudantil
- **Pull requests submetidos pelo seu grupo:**
  
  | 👤 Integrante | 🔧 Refatoração | 🔗 Link do PR |
  |--------------|---------------|----------------|
    | <a href="https://github.com/arthur-am">Arthur Araujo Mendonca</a> | Criação de Função de Validação (nova) |  <a href="https://github.com/pedroseabra27/Sistema-de-Moeda-Estudantil/pull/3">Refatorações sugeridas</a> |
    | <a href="https://github.com/betelguelse">Eddie Christian</a> | Centralizar Validação com Zod | <a href="https://github.com/pedroseabra27/Sistema-de-Moeda-Estudantil/pull/3">Refatorações sugeridas</a> |
    | <a href="https://github.com/arthur-am">Arthur Araujo Mendonca</a> | Padronizar Criação com Role (`criarEmpresa`) |  <a href="https://github.com/pedroseabra27/Sistema-de-Moeda-Estudantil/pull/3">Refatorações sugeridas</a> |

---

## 🧱 3. Arquitetura e Tecnologias Utilizadas

O projeto utiliza uma arquitetura moderna baseada em **SvelteKit** para o frontend e **Drizzle ORM** para persistência de dados, com organização modular e separação clara entre camadas de apresentação, lógica de negócio e acesso a dados.

### 🏗️ Backend — Node.js + Drizzle ORM
- **Controllers:** arquivos em `src/lib/server` e subpastas, responsáveis por lógica de negócio e acesso ao banco.
- **ORM:** Drizzle para manipulação de dados em SQL.
- **Estrutura modular:** cada domínio (aluno, empresa, professor, transação, vantagem) possui subpastas para schema e model.

### 🎨 Frontend — SvelteKit
- **Componentização:** uso extensivo de componentes Svelte reutilizáveis.
- **Rotas:** organizadas por contexto de usuário (admin, aluno, empresa, professor) em `src/routes`.
- **Estilização:** CSS modular em `app.css` e componentes.

### 🔄 Integração
- O frontend consome APIs e lógica do backend via endpoints SvelteKit e chamadas diretas a métodos server-side.

---


## 🗂️ 4. Organização do GitHub e Fluxo de Trabalho Colaborativo

- **Estrutura de Pastas:** O projeto está bem organizado, com separação clara entre código-fonte, configurações, migrações e documentação.
- **Documentação:** O `README.md` é bastante completo, trazendo instruções detalhadas de setup, exemplos de variáveis de ambiente, dependências, troubleshooting e até orientações de deploy. Recomenda-se apenas manter a documentação sempre atualizada conforme o projeto evoluir, podendo incluir uma seção de FAQ ou exemplos de erros comuns para facilitar ainda mais o onboarding.
- **Issues e PRs:** Não há uso extensivo de Issues ou Pull Requests para rastreamento de tarefas e revisões.
- **Commits:** Não há padrão explícito de Conventional Commits.
- **Tags/Releases:** Não foram identificadas tags ou releases.

---

## 🖥️ 5. Dificuldade para Configuração do Ambiente

- **Dependências:** O projeto depende de Node.js, npm e banco de dados SQL (configurado via Drizzle).
- **Configuração:** O setup é bem documentado, com instruções claras sobre variáveis de ambiente, comandos de migração, inicialização do banco e troubleshooting. O README cobre desde o ambiente local até deploy na Railway, facilitando o processo para novos desenvolvedores.
- **Sugestão:** Manter a documentação sempre atualizada e considerar adicionar uma seção de dúvidas frequentes (FAQ) ou exemplos de erros comuns, caso surjam dúvidas recorrentes entre os usuários.

---

## 🔎 6. Análise de Qualidade do Código e Testes

- **Design:** O código é modular, mas há oportunidades de extração de funções utilitárias e padronização de nomes.
- **Testes:** Não foram identificados testes automatizados.
- **Segurança:** Não há evidências de sanitização de entradas ou tratamento centralizado de erros.

---

## 🚀 7. Sugestões de Melhorias

1. **Manter a documentação sempre atualizada**, incluindo exemplos de `.env`, troubleshooting e, se possível, uma seção de FAQ para dúvidas recorrentes.
2. **Adotar Conventional Commits** e padronizar mensagens de commit.
3. **Implementar testes automatizados** para lógica de negócio e endpoints.
4. **Centralizar tratamento de erros** e sanitização de entradas.
5. **Padronizar nomes de funções e variáveis** para maior clareza.
6. **Utilizar Issues e Pull Requests** para rastreabilidade e revisão de código.
7. **Adicionar scripts de migração e seed** para facilitar setup do banco.

---

## 🔧 8. Refatorações Propostas (3 partes do código)

### 1️⃣ Refatoração 1 – Criação de Função de Validação (nova)

**Arquivo (canônico):** `codigo/src/lib/server/db/aluno/model.ts`

> Observação: a validação não existia como função separada anteriormente — havia validações pontuais/inline. Nesta refatoração **criamos** a função `validarAlunoInput` e extraímos a validação inline para consolidar o comportamento.

#### 🔴 Antes (exemplo do comportamento anterior)
```typescript
export async function criarAluno(dados: AlunoInput) {
    if (!dados.cpf || !dados.curso || !dados.user_id) {
        throw new Error('CPF, curso e user_id são obrigatórios');
    }
    // ...restante da lógica...
}
```

#### 🟢 Depois (o que a refatoração criou)
```typescript
function validarAlunoInput(dados: AlunoInput) {
    if (!dados.cpf || !dados.curso || !dados.user_id) {
        throw new Error('CPF, curso e user_id são obrigatórios');
    }
}

export async function criarAluno(dados: AlunoInput) {
    validarAlunoInput(dados);
    // ...restante da lógica...
}
```

#### ✔ Tipo de refatoração aplicada
- **Create Function / Extract Validation**

#### 📝 Justificativa
A criação da função separada melhora a clareza, separação de responsabilidades, facilita testes e padroniza a validação em um único ponto do código.

---


### 2️⃣ Refatoração 2 – Centralizar Validação com Zod (Front + Back)

**Arquivos adicionados:**
- `codigo/src/lib/shared/schemas/aluno.ts`
- `codigo/src/lib/shared/schemas/empresa.ts`

#### 🔴 Antes
Validação estava espalhada: `aluno` e `empresa` tinham checagens pontuais (e.g., `if (!info.user_id)`), sem um contrato reutilizável entre frontend e backend. Isso tornava fácil introduzir inconsistências (como validar `nome`/`email` no lugar de `cpf`/`curso`).

#### 🟢 Depois (aplicado)
```typescript
// src/lib/shared/schemas/aluno.ts
export const alunoSchema = z.object({ cpf: z.string(), curso: z.string(), endereco: z.string().optional(), user_id: z.string() });

// src/lib/shared/schemas/empresa.ts
export const empresaSchema = z.object({ nome: z.string(), cnpj: z.string(), saldo: z.number().optional(), user_id: z.string() });
```

Além disso, o frontend agora valida com os mesmos schemas antes de submeter (`signup` pages), e os comandos server-side (`inserirAluno`, `inserirEmpresa`) usam os mesmos schemas como validação inicial. Isso elimina classes de bug por inconsistência e fornece feedback imediato ao usuário.

#### ✔ Tipo de refatoração aplicada
- **Shared Validation Layer (Zod)**

#### 📝 Justificativa
Garante um contrato único de validação compartilhado entre frontend e backend, reduz bug-risks, fornece validação imediata no cliente e validação segura no servidor, evitando regressões (ex.: validações inconsistentes como a que validava `nome`/`email`).

---


### 3️⃣ Refatoração 3 – Padronizar Criação com Role + Renomear `criar` → `criarEmpresa`

**Arquivo alterado:** `codigo/src/lib/server/db/empresa/model.ts` (+ helper em `codigo/src/lib/server/db/helpers.ts`)

#### 🔴 Antes
Criações repetiam a mesma sequência: inserir registro X e depois atualizar `user.role` para 'empresa' (ou 'estudante'), com checagens parciais.

#### 🟢 Depois (aplicado)
```typescript
// src/lib/server/db/helpers.ts
export async function createAndAssignRole(tx, insertFn, userId, role) { /* ... */ }

// src/lib/server/db/empresa/model.ts
criarEmpresa: async (info: InsertEmpresa) { /* valida via Zod e usa createAndAssignRole */ },
// alias backward-compatible: criar -> criarEmpresa
```

#### ✔ Tipo de refatoração aplicada
- **Extract Helper + Rename Function**

#### 📝 Justificativa
Reduz duplicidade (DRY) ao centralizar o padrão "insert + set role" em um helper reutilizável e torna a API do modelo mais explícita com `criarEmpresa`. Mantivemos uma alias `criar` para compatibilidade, evitando quebrar consumidores existentes.

---

## 9. 📄 Conclusão

A análise crítica evidenciou pontos positivos na modularidade e uso de tecnologias modernas, mas também mostrou oportunidades de melhoria em documentação, padronização e testes. As refatorações propostas visam aumentar a clareza, reduzir duplicidade e facilitar a manutenção do sistema.

---

## 10. 📚 Referências
- [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)
- [Documentação SvelteKit](https://kit.svelte.dev/docs)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
