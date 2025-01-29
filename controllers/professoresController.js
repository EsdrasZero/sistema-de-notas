const Professor = require("../models/Professor"); // Corrigido o caminho de importação

exports.createProfessor = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Validações básicas
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    // Verificar se o email já está em uso
    const professorExistente = await Professor.findOne({ where: { email } });
    if (professorExistente) {
      return res.status(400).json({ error: "Email já está em uso." });
    }

    const novoProfessor = await Professor.create({ nome, email, senha });
    res.status(201).json(novoProfessor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar professor." });
  }
};

exports.getProfessores = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.status(200).json(professores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar professores." });
  }
};
