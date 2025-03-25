# Parthos Web

## Visão Geral
O **Parthos Web** é a interface SPA (*Single Page Application*) do projeto Parthos, desenvolvido com **Angular** e servido via **Nginx**. O objetivo é fornecer uma experiência imersiva para gerenciamento de tarefas, inspirado no universo de Skyrim.

## Funcionalidades Principais

- **Autenticação:** Cadastro e login com suporte a JWT (recuperação de senha ainda não implementada).
- **Gerenciamento de Tarefas:** Interface baseada no conceito *Kanban* (status adicionais em desenvolvimento).
- **Registro de Atividades:** Histórico detalhado das ações realizadas em cada tarefa.

---

## Releases

- **[Versão 1.0.0](https://github.com/Gaiteiro2025/parthos-web/releases/tag/v1.0.0)** - Primeira versão estável do Parthos Web.

---

## Como Rodar o Projeto

### 1. Clonar o Repositório
```sh
git clone git@github.com:Gaiteiro2025/parthos-web.git
cd parthos-web
```

### 2. Instalar Dependências
```sh
npm install
```

### 3. Iniciar o Servidor de Desenvolvimento
```sh
npm start
```
Isso iniciará a aplicação em modo de desenvolvimento, acessível em `http://localhost:4200`.

### 4. Construir para Produção
```sh
npm run build
```
O resultado será gerado na pasta `dist/` e pode ser servido via **Nginx** ou outro servidor estático.

---

## Deployment
O frontend é servido via **Nginx**, integrado ao ambiente Docker do Parthos. Para atualizar a versão em produção:

1. Build da aplicação:
   ```sh
   npm run build
   ```
2. Copiar os arquivos para o diretório configurado no **Nginx**.
3. Reiniciar o serviço do **Nginx**.

---

## Tecnologias Utilizadas

- **Frontend:** Angular + Material UI
- **Infraestrutura:** Nginx + Docker
- **CI/CD:** GitHub Actions

---

## Licença
Este projeto está sob a **licença MIT**.

