const Professor = require("@models/Professor");

exports.createProfessor = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoProfessor = await Professor.create({ nome, email, senha });
    res.status(201).json(novoProfessor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar professor." });
  }
};

exports.getProfessores = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.status(200).json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores." });
  }
};
