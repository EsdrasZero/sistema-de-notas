const Professor = require("../models/Professor");

exports.getProfessores = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores." });
  }
};

exports.createProfessor = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const novoProfessor = await Professor.create({ nome, email, senha });
    res.status(201).json(novoProfessor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar professor." });
  }
};
