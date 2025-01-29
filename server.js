const express = require("express");
const sequelize = require("./config/database"); // Corrigido o caminho de importação
const Professor = require("./models/Professor");
const Aluno = require("./models/Aluno");
const Disciplina = require("./models/Disciplina");
const Nota = require("./models/Nota");
const router = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

sequelize
  .authenticate()
  .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

// Atenção ao uso de force: true! Ele recria as tabelas no banco.
sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("Banco de dados sincronizado!");

    // Criar professor
    const professorCarlos = await Professor.create({
      nome: "Carlos Souza",
      email: "carlos@example.com",
      senha: "123456",
    });

    // Verificar se os alunos e disciplinas já existem
    const [aluno1] = await Aluno.findOrCreate({
      where: { nome: "João Silva", turma: "Turma A" },
    });
    const [aluno2] = await Aluno.findOrCreate({
      where: { nome: "Maria Oliveira", turma: "Turma B" },
    });

    const disciplinasFixas = [
      "Artes",
      "Ciências",
      "Educação Física",
      "Geografia",
      "História",
      "Língua Portuguesa",
      "Matemática",
    ];

    // Criar disciplinas e associar ao professor Carlos
    for (const nome of disciplinasFixas) {
      await Disciplina.findOrCreate({
        where: { nome },
        defaults: { professorId: professorCarlos.id },
      });
    }

    // Criando notas para os alunos
    const disciplinas = await Disciplina.findAll();

    const notas = [
      {
        alunoId: aluno1.id,
        disciplinaId: disciplinas.find((d) => d.nome === "Matemática").id,
        nota: 7.5,
      },
      {
        alunoId: aluno1.id,
        disciplinaId: disciplinas.find((d) => d.nome === "História").id,
        nota: 8.0,
      },
      {
        alunoId: aluno2.id,
        disciplinaId: disciplinas.find((d) => d.nome === "Matemática").id,
        nota: 9.0,
      },
      {
        alunoId: aluno2.id,
        disciplinaId: disciplinas.find((d) => d.nome === "História").id,
        nota: 6.5,
      },
      {
        alunoId: aluno2.id,
        disciplinaId: disciplinas.find((d) => d.nome === "Ciências").id,
        nota: 7.0,
      },
      {
        alunoId: aluno2.id,
        disciplinaId: disciplinas.find((d) => d.nome === "Geografia").id,
        nota: 8.5,
      },
    ];

    for (const nota of notas) {
      await Nota.create(nota);
    }

    console.log("Dados iniciais inseridos com sucesso!");
  })
  .catch((err) => console.error("Erro ao sincronizar o banco de dados:", err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
