const express = require("express");
const router = express.Router();
const professoresController = require("../controllers/professoresController");
const notaController = require("../controllers/notaController");
const authController = require("../controllers/authController");
const Aluno = require("../models/Aluno");
const Disciplina = require("../models/Disciplina");

// Rota para pegar todos os professores
router.get("/professores", professoresController.getProfessores);

// Rota para criar um novo professor
router.post("/professores", professoresController.createProfessor);

// Rota para lançar nota
router.post("/notas", notaController.lancarNota);

// Rota para listar notas de um aluno
router.get("/notas/:alunoId", notaController.listarNotas);

// Rota para obter o boletim de um aluno
router.get("/boletim/:alunoId", notaController.boletimAluno);

// Rota para listar todos os alunos
router.get("/alunos", async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
});

// Rota para listar todas as disciplinas
router.get("/disciplinas", async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll();
    res.json(disciplinas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar disciplinas." });
  }
});

// Rota de login
router.post("/login", authController.login);

// Rota para atualizar nota de um aluno
router.put("/notas/:alunoId/:disciplinaId", notaController.atualizarNota);

router.get("/", (req, res) => {
  res.send("Bem-vindo à API de Lançamento de Notas!");
});

module.exports = router;
