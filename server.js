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

    // Criar  10 alunos para Turma A
    const nomesTurmaA = [
      "Ana Clara",
      "Bruno Henrique",
      "Carlos Eduardo",
      "Daniela Souza",
      "Eduardo Lima",
      "Fernanda Alves",
      "Gabriel Santos",
      "Helena Costa",
      "Igor Pereira",
      "Juliana Martins",
    ];

    const alunosTurmaA = [];
    for (const nome of nomesTurmaA) {
      const [aluno] = await Aluno.findOrCreate({
        where: { nome, turma: "Turma A" },
      });
      alunosTurmaA.push(aluno);
    }

    // Criar 10 alunos para Turma B
    const nomesTurmaB = [
      "Laura Oliveira",
      "Marcos Vinicius",
      "Nathalia Silva",
      "Otavio Mendes",
      "Paula Ferreira",
      "Rafael Almeida",
      "Sofia Rocha",
      "Thiago Barbosa",
      "Vanessa Ribeiro",
      "William Souza",
    ];

    const alunosTurmaB = [];
    for (const nome of nomesTurmaB) {
      const [aluno] = await Aluno.findOrCreate({
        where: { nome, turma: "Turma B" },
      });
      alunosTurmaB.push(aluno);
    }

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

    // Criando notas para todos os alunos em todas as disciplinas
    const disciplinas = await Disciplina.findAll();
    const todosAlunos = [aluno1, aluno2, ...alunosTurmaA, ...alunosTurmaB];

    for (const aluno of todosAlunos) {
      for (const disciplina of disciplinas) {
        await Nota.create({
          alunoId: aluno.id,
          disciplinaId: disciplina.id,
          nota: Math.floor(Math.random() * 6) + 5, //
        });
      }
    }

    console.log("Dados iniciais inseridos com sucesso!");
  })
  .catch((err) => console.error("Erro ao sincronizar o banco de dados:", err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
