const Nota = require("@models/Nota");
const Aluno = require("@models/Aluno");
const Disciplina = require("@models/Disciplina");

exports.lancarNota = async (req, res) => {
  const { alunoId, disciplinaId, nota } = req.body;

  try {
    // Verifica se o aluno e a disciplina existem
    const aluno = await Aluno.findByPk(alunoId);
    const disciplina = await Disciplina.findByPk(disciplinaId);

    if (!aluno || !disciplina) {
      return res
        .status(404)
        .json({ error: "Aluno ou Disciplina não encontrados." });
    }

    // Cria a nota
    const novaNota = await Nota.create({ alunoId, disciplinaId, nota });

    res.status(201).json(novaNota);
  } catch (error) {
    res.status(500).json({ error: "Erro ao lançar nota." });
  }
};

exports.listarNotas = async (req, res) => {
  const { alunoId } = req.params;

  try {
    // Encontra todas as notas do aluno
    const notas = await Nota.findAll({
      where: { alunoId },
      include: [
        { model: Aluno, as: "aluno" },
        { model: Disciplina, as: "disciplina" },
      ],
    });

    if (!notas.length) {
      return res
        .status(404)
        .json({ error: "Nenhuma nota encontrada para este aluno." });
    }

    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar notas." });
  }
};
exports.boletimAluno = async (req, res) => {
  const { alunoId } = req.params;

  try {
    const boletim = await Nota.findAll({
      where: { alunoId },
      include: [{ model: Disciplina, as: "disciplina" }],
    });

    if (!boletim.length) {
      return res
        .status(404)
        .json({ error: "Nenhuma nota encontrada para este aluno." });
    }

    // Formatar boletim
    const resultado = boletim.map((item) => ({
      disciplina: item.disciplina.nome,
      nota: item.nota,
    }));

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar boletim." });
  }
};
