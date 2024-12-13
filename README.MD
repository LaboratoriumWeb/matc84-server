# **To-Do List Backend - Express.js + MySQL**

Este é o backend para o projeto de To-Do List, desenvolvido com **Express.js** e **MySQL**. Este guia contém instruções para configurar e rodar o backend, instalar e configurar o banco de dados MySQL.

---

## **Requisitos**

Antes de começar, certifique-se de ter os seguintes itens instalados em sua máquina:

- **Node.js** (v18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **MySQL Server**
- **MySQL Workbench** (opcional, mas recomendado para gerenciar o banco de dados)

---

## **Passo 1: Instalar o MySQL Server**

1. Baixe o **MySQL Community Server** em:  
   [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

2. Durante a instalação:
   - Escolha a configuração "Developer Default".
   - Configure uma senha para o usuário `root` (guarde essa senha, pois será usada mais tarde, em seu arquivo .env).

3. Teste a instalação:
   - Abra o terminal e digite:
     ```bash
     mysql -u root -p
     ```
   - Insira a senha configurada e, se funcionar, você estará conectado ao servidor MySQL.

---

## **Passo 2: Instalar o MySQL Workbench (OPCIONAL)**

1. Baixe o **MySQL Workbench** em:  
   [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/)

2. Instale e abra o Workbench.

3. Configure uma conexão com o servidor MySQL:
   - Hostname: `localhost`
   - Username: `root`
   - Password: (a senha configurada anteriormente)

4. Clique em "Test Connection" para verificar se tudo está funcionando.

---

## **Passo 3: Configurar o Backend**

1. Clone o repositório:

   ```bash
   git clone https://github.com/LaboratoriumWeb/matc84-server.git
   cd matc84-server
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua-senha
   DB_NAME=todo_list
   PORT=3001
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

5. O servidor estará disponível em `http://localhost:3001`.

---

Pronto! O backend está configurado e pronto para ser usado.
