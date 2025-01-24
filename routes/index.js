const express = require("express");
const router = express.Router();
const professoresController = require("@controllers/professoresController");
const notaController = require("@controllers/notaController");

// Rota para pegar todos os professores
router.get("/professores", professoresController.getProfessores);

// Rota para criar um novo professor
router.post("/professores", professoresController.createProfessor);

// Rota para lançar nota
router.post("/notas", notaController.lancarNota);

// Rota para listar notas de um aluno
router.get("/notas/:alunoId", notaController.listarNotas);

router.get("/boletim/:alunoId", notaController.boletimAluno);

router.get("/", (req, res) => {
  res.send("Bem-vindo à API de Lançamento de Notas!");
});

module.exports = router;
