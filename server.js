require("module-alias/register");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const sequelize = require("./config/database");
const PORT = process.env.PORT || 3000;
const app = express();
const Aluno = require("@models/Aluno");
const Disciplina = require("@models/Disciplina");
const Nota = require("@models/Nota");
const Professor = require("@models/Professor");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api", routes); // Importando as rotas de forma centralizada
app.use(logger);
app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

// Atenção ao uso de force: true! Ele recria as tabelas no banco.
sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("Banco de dados sincronizado!");

    await Professor.create({
      nome: "Carlos Souza",
      email: "carlos@example.com",
      senha: "123456",
    });

    // Verificar se os alunos e disciplinas já existem
    const aluno1 = await Aluno.findOrCreate({
      where: { nome: "João Silva", turma: "Turma A" },
    });
    const aluno2 = await Aluno.findOrCreate({
      where: { nome: "Maria Oliveira", turma: "Turma B" },
    });

    const disciplina1 = await Disciplina.findOrCreate({
      where: { nome: "Matemática" },
    });
    const disciplina2 = await Disciplina.findOrCreate({
      where: { nome: "História" },
    });

    // Criando notas para os alunos
    await Nota.create({
      alunoId: aluno1[0].id,
      disciplinaId: disciplina1[0].id,
      nota: 7.5,
    });
    await Nota.create({
      alunoId: aluno1[0].id,
      disciplinaId: disciplina2[0].id,
      nota: 8.0,
    });
    await Nota.create({
      alunoId: aluno2[0].id,
      disciplinaId: disciplina1[0].id,
      nota: 6.5,
    });
    await Nota.create({
      alunoId: aluno2[0].id,
      disciplinaId: disciplina2[0].id,
      nota: 9.0,
    });

    console.log("Dados iniciais adicionados!");
  })
  .catch((err) => console.error("Erro ao sincronizar o banco de dados:", err));
app.get("/", (req, res) => {
  res.send("API de Lançamento de Notas está funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
