const Nota = require("../models/Nota");
const Aluno = require("../models/Aluno");
const Disciplina = require("../models/Disciplina");

exports.lancarNota = async (req, res) => {
  const { alunoId, disciplinaId, nota, semestre } = req.body;

  try {
    const aluno = await Aluno.findByPk(alunoId);
    const disciplina = await Disciplina.findByPk(disciplinaId);

    if (!aluno || !disciplina) {
      return res
        .status(404)
        .json({ error: "Aluno ou Disciplina não encontrados." });
    }

    const novaNota = await Nota.create({
      alunoId,
      disciplinaId,
      nota,
      semestre,
    });

    res.status(201).json(novaNota);
  } catch (error) {
    res.status(500).json({ error: "Erro ao lançar nota." });
  }
};

exports.listarNotas = async (req, res) => {
  const { alunoId } = req.params;

  try {
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
    console.error(error);
    res.status(500).json({ error: "Erro ao listar notas." });
  }
};

exports.boletimAluno = async (req, res) => {
  const alunoId = parseInt(req.params.alunoId, 10);

  if (isNaN(alunoId)) {
    return res.status(400).json({ error: "ID do aluno inválido." });
  }

  try {
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    const notas = await Nota.findAll({
      where: { alunoId },
      include: [{ model: Disciplina, as: "disciplina" }],
    });

    if (!notas.length) {
      return res
        .status(404)
        .json({ error: "Nenhuma nota encontrada para este aluno." });
    }

    const resultado = {
      name: aluno.name,
      grades: notas.map((nota) => ({
        subject: nota.disciplina.name,
        firstSemester: nota.firstSemester,
        secondSemester: nota.secondSemester,
      })),
    };

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar boletim." });
  }
};

exports.atualizarNota = async (req, res) => {
  const { alunoId, disciplinaId } = req.params;
  const { firstSemester, secondSemester } = req.body;

  try {
    const nota = await Nota.findOne({
      where: { alunoId, disciplinaId },
    });

    if (!nota) {
      return res.status(404).json({ error: "Nota não encontrada." });
    }

    if (firstSemester !== undefined) {
      nota.firstSemester = firstSemester;
    }

    if (secondSemester !== undefined) {
      nota.secondSemester = secondSemester;
    }

    await nota.save();

    res.status(200).json(nota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar nota." });
  }
};
