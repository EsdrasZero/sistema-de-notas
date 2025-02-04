# Sistema de Lançamento de Notas  

Este projeto é uma API desenvolvida com **Node.js**, **Express** e **Sequelize** para gerenciar o lançamento de notas de alunos em um banco de dados **PostgreSQL**. A API permite que professores realizem operações como lançamento, atualização e consulta de notas, além da geração de boletins.  

## 📌 Funcionalidades  
- Autenticação de professores 
- Lançamento e atualização de notas  
- Listagem de notas por aluno  
- Geração automática de boletins  

## 🛠 Tecnologias Utilizadas  
- **Node.js**  
- **Express**  
- **Sequelize** (ORM para PostgreSQL)  
- **PostgreSQL**  
- **Docker** (para ambiente de banco de dados)  
  

## 🚀 Como Rodar o Projeto  

### 1️⃣ Clonar o Repositório  
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

2️⃣ Subir o Container do Banco de Dados

Certifique-se de ter o Docker instalado e execute:

docker-compose up -d

Isso iniciará um container PostgreSQL para armazenar os dados.
3️⃣ Verificar a Conexão com o Banco

Abra o DBeaver (ou outro cliente SQL) e valide a conexão com o PostgreSQL.
Certifique-se de que as tabelas estão sincronizadas e que os dados iniciais foram carregados corretamente.
4️⃣ Instalar as Dependências

Caso esteja rodando o projeto pela primeira vez ou tenha excluído node_modules, execute:

npm install

5️⃣ Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta

6️⃣ Iniciar o Servidor

Para rodar a API, execute o seguinte comando:

npm start

A API estará disponível em http://localhost:3000.
📌 Endpoints Principais
Recurso	Endpoint	Método	Descrição
Autenticação	/auth/login	POST	Login de professores
Professores	/professores	GET/POST	Gerenciamento de professores
Notas	/notas	GET/POST/PUT	Gerenciamento de notas
Alunos	/alunos	GET	Listagem de alunos
Disciplinas	/disciplinas	GET	Listagem de disciplinas


🤝 Contribuição

Contribuições são bem-vindas! Para colaborar:

    Faça um fork do repositório
    Crie uma branch com sua funcionalidade 
    Faça um commit (git commit -m 'Adiciona nova funcionalidade')
    Envie um pull request

📄 Licença

Este projeto está licenciado sob a MIT License.

💡 Feito com ❤️ para a Escola Conhecimento 🎓