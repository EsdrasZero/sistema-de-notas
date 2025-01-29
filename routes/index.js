const express = require("express");
const router = express.Router();
const professoresController = require("../controllers/professoresController"); // Corrigido o caminho de importação
const notaController = require("../controllers/notaController"); // Corrigido o caminho de importação
const authController = require("../controllers/authController"); // Corrigido o caminho de importação
const Aluno = require("../models/Aluno"); // Certifique-se de importar o modelo Aluno
const Disciplina = require("../models/Disciplina"); // Certifique-se de importar o modelo Disciplina
const Nota = require("../models/Nota"); // Certifique-se de importar o modelo Nota

// Rota de autenticação
router.post("/login", authController.login);

// Rota para troca de senha
router.put("/trocar-senha", authController.trocarSenha);

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

// Rota para listar todas as notas
router.get("/notas", async (req, res) => {
  try {
    const notas = await Nota.findAll();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notas." });
  }
});

router.get("/", (req, res) => {
  res.send("Bem-vindo à API de Lançamento de Notas!");
});

module.exports = router;
