const express = require("express");
const sequelize = require("./config/database");
const Aluno = require("./models/Aluno");
const Disciplina = require("./models/Disciplina");
const Nota = require("./models/Nota");
const Professor = require("./models/Professor");
const routes = require("./routes/index");
const router = require("./routes/index");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
app.use(cors());
app.use(express.json());
app.use("/", routes);

app.use(cors(
  {
    origin: "*",
    allowedHeaders: "*",
    methods: "*"
  }
));

sequelize
  .authenticate()
  .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

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

    const students = [
      { id: 1, name: "Alice Souza de Melo", gender: "female" },
      { id: 2, name: "Bruno Soares", gender: "male" },
      { id: 3, name: "Carla Pereira", gender: "female" },
      { id: 4, name: "Daniel Oliveira", gender: "male" },
      { id: 5, name: "Elisa Fernandes", gender: "female" },
      { id: 6, name: "Felipe Costa", gender: "male" },
      { id: 7, name: "Gabriela Assis", gender: "female" },
      { id: 8, name: "Henrique Lima", gender: "male" },
      { id: 9, name: "Isabela Santos", gender: "female" },
      { id: 10, name: "João Silva", gender: "male" },
    ];

    const subjects = [
      "Artes",
      "Ciências",
      "Educação Física",
      "Geografia",
      "História",
      "Língua Portuguesa",
      "Matemática",
    ];

    // Criar alunos
    for (const student of students) {
      await Aluno.create(student);
    }

    // Criar disciplinas
    for (const subject of subjects) {
      await Disciplina.create({ name: subject });
    }

    // Criar notas
    const studentsGrades = {
      1: {
        name: "Alice Souza de Melo",
        grades: [
          { subject: "Artes", firstSemester: 8.5, secondSemester: 7.9 },
          { subject: "Ciências", firstSemester: 6.7, secondSemester: 5.8 },
          {
            subject: "Educação Física",
            firstSemester: 7.8,
            secondSemester: 8.2,
          },
          { subject: "Geografia", firstSemester: 6.9, secondSemester: 7.1 },
          { subject: "História", firstSemester: 6.4, secondSemester: 7.5 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 8.2,
            secondSemester: 8.6,
          },
          { subject: "Matemática", firstSemester: 5.3, secondSemester: 5.7 },
        ],
      },
      2: {
        name: "Bruno Soares",
        grades: [
          { subject: "Artes", firstSemester: 7.5, secondSemester: 8.0 },
          { subject: "Ciências", firstSemester: 6.0, secondSemester: 6.5 },
          {
            subject: "Educação Física",
            firstSemester: 7.0,
            secondSemester: 7.5,
          },
          { subject: "Geografia", firstSemester: 8.0, secondSemester: 8.3 },
          { subject: "História", firstSemester: 7.5, secondSemester: 8.0 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 8.5,
            secondSemester: 8.9,
          },
          { subject: "Matemática", firstSemester: 7.0, secondSemester: 7.5 },
        ],
      },
      3: {
        name: "Carla Pereira",
        grades: [
          { subject: "Artes", firstSemester: 9.0, secondSemester: 8.5 },
          { subject: "Ciências", firstSemester: 7.5, secondSemester: 7.0 },
          {
            subject: "Educação Física",
            firstSemester: 8.5,
            secondSemester: 8.0,
          },
          { subject: "Geografia", firstSemester: 8.5, secondSemester: 8.7 },
          { subject: "História", firstSemester: 6.5, secondSemester: 7.4 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 9.0,
            secondSemester: 8.8,
          },
          { subject: "Matemática", firstSemester: 7.5, secondSemester: 7.8 },
        ],
      },
      4: {
        name: "Daniel Oliveira",
        grades: [
          { subject: "Artes", firstSemester: 6.5, secondSemester: 7.0 },
          { subject: "Ciências", firstSemester: 5.5, secondSemester: 6.0 },
          {
            subject: "Educação Física",
            firstSemester: 7.0,
            secondSemester: 7.5,
          },
          { subject: "Geografia", firstSemester: 7.5, secondSemester: 8.0 },
          { subject: "História", firstSemester: 6.0, secondSemester: 6.5 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 7.5,
            secondSemester: 8.0,
          },
          { subject: "Matemática", firstSemester: 6.5, secondSemester: 7.0 },
        ],
      },
      5: {
        name: "Elisa Fernandes",
        grades: [
          { subject: "Artes", firstSemester: 8.0, secondSemester: 8.5 },
          { subject: "Ciências", firstSemester: 7.0, secondSemester: 7.5 },
          {
            subject: "Educação Física",
            firstSemester: 8.0,
            secondSemester: 8.5,
          },
          { subject: "Geografia", firstSemester: 8.5, secondSemester: 8.9 },
          { subject: "História", firstSemester: 7.5, secondSemester: 8.0 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 8.5,
            secondSemester: 8.8,
          },
          { subject: "Matemática", firstSemester: 7.5, secondSemester: 7.9 },
        ],
      },
      6: {
        name: "Felipe Costa",
        grades: [
          { subject: "Artes", firstSemester: 7.0, secondSemester: 7.5 },
          { subject: "Ciências", firstSemester: 6.0, secondSemester: 6.5 },
          {
            subject: "Educação Física",
            firstSemester: 7.5,
            secondSemester: 8.0,
          },
          { subject: "Geografia", firstSemester: 3.5, secondSemester: 5.6 },
          { subject: "História", firstSemester: 6.5, secondSemester: 7.0 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 7.5,
            secondSemester: 8.0,
          },
          { subject: "Matemática", firstSemester: 6.5, secondSemester: 7.0 },
        ],
      },
      7: {
        name: "Gabriela Assis",
        grades: [
          { subject: "Artes", firstSemester: 8.0, secondSemester: 8.5 },
          { subject: "Ciências", firstSemester: 7.0, secondSemester: 7.5 },
          {
            subject: "Educação Física",
            firstSemester: 8.0,
            secondSemester: 8.5,
          },
          { subject: "Geografia", firstSemester: 8.5, secondSemester: 8.9 },
          { subject: "História", firstSemester: 7.5, secondSemester: 8.0 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 8.5,
            secondSemester: 8.8,
          },
          { subject: "Matemática", firstSemester: 7.5, secondSemester: 7.9 },
        ],
      },
      8: {
        name: "Henrique Lima",
        grades: [
          { subject: "Artes", firstSemester: 7.5, secondSemester: 8.0 },
          { subject: "Ciências", firstSemester: 6.5, secondSemester: 7.0 },
          {
            subject: "Educação Física",
            firstSemester: 7.5,
            secondSemester: 8.0,
          },
          { subject: "Geografia", firstSemester: 4.2, secondSemester: 6.5 },
          { subject: "História", firstSemester: 5.6, secondSemester: 6.5 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 6.0,
            secondSemester: 5.5,
          },
          { subject: "Matemática", firstSemester: 7.0, secondSemester: 7.5 },
        ],
      },
      9: {
        name: "Isabela Santos",
        grades: [
          { subject: "Artes", firstSemester: 8.5, secondSemester: 9.0 },
          { subject: "Ciências", firstSemester: 7.5, secondSemester: 8.0 },
          {
            subject: "Educação Física",
            firstSemester: 8.5,
            secondSemester: 9.0,
          },
          { subject: "Geografia", firstSemester: 8.5, secondSemester: 8.9 },
          { subject: "História", firstSemester: 7.5, secondSemester: 8.0 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 8.5,
            secondSemester: 8.8,
          },
          { subject: "Matemática", firstSemester: 4.5, secondSemester: 5.2 },
        ],
      },
      10: {
        name: "João Silva",
        grades: [
          { subject: "Artes", firstSemester: 7.0, secondSemester: 7.5 },
          { subject: "Ciências", firstSemester: 6.0, secondSemester: 6.5 },
          {
            subject: "Educação Física",
            firstSemester: 7.5,
            secondSemester: 8.0,
          },
          { subject: "Geografia", firstSemester: 7.5, secondSemester: 8.0 },
          { subject: "História", firstSemester: 6.5, secondSemester: 7.0 },
          {
            subject: "Língua Portuguesa",
            firstSemester: 7.5,
            secondSemester: 8.0,
          },
          { subject: "Matemática", firstSemester: 6.5, secondSemester: 7.0 },
        ],
      },
    };

    for (const [studentId, studentData] of Object.entries(studentsGrades)) {
      const aluno = await Aluno.findByPk(studentId);
      for (const grade of studentData.grades) {
        const disciplina = await Disciplina.findOne({
          where: { name: grade.subject },
        });
        await Nota.create({
          alunoId: aluno.id,
          disciplinaId: disciplina.id,
          firstSemester: grade.firstSemester,
          secondSemester: grade.secondSemester,
        });
      }
    }

    console.log("Dados iniciais inseridos com sucesso!");
  })
  .catch((err) => console.error("Erro ao sincronizar o banco de dados:", err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
