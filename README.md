# Como rodar o projeto de Lançamento de Notas

## Passos para rodar o projeto

1. **Abrir o terminal na pasta do projeto**  
   Certifique-se de estar no diretório raiz onde está o seu projeto.

2. **Subir o container do PostgreSQL com Docker**  
   ```bash
   docker-compose up -d

Isso iniciará o banco de dados no Docker.

    Verificar a conexão com o banco no DBeaver
        Abra o DBeaver e verifique se a conexão com o PostgreSQL está funcionando.
        Certifique-se de que o banco tem as tabelas sincronizadas e que os dados iniciais foram adicionados.

    Instalar as dependências do projeto (se necessário)
    Caso tenha apagado a pasta node_modules ou esteja em um novo ambiente:

npm install

Configurar as variáveis de ambiente
Certifique-se de que o arquivo .env está configurado corretamente:

DB_HOST=localhost
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha
DB_PORT=5432


Iniciar o servidor Node.js
Use o comando:

node server.js

Ou, se quiser monitorar mudanças no código durante o desenvolvimento:

    nodemon server.js

Resumo dos principais comandos
Ação	Comando
Subir o banco de dados (Docker)	docker-compose up -d
Instalar dependências	npm install
Iniciar o servidor	node server.js ou nodemon server.js
Ver logs do banco de dados	docker logs nome_do_container
Parar os containers	docker-compose down
Verificar se tudo está funcionando

    Acesse no navegador ou Postman:
    http://localhost:3000
    Você deve ver a mensagem:
    "API de Lançamento de Notas está funcionando!"

    Teste as rotas criadas no Postman:
        GET /api/professores
        POST /api/professores (para criar um professor)
        POST /api/notas (para lançar uma nota)
        GET /api/notas/:alunoId (para listar notas de um aluno)