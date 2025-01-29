const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Corrigido o caminho de importação

const Aluno = sequelize.define(
  "Aluno",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    turma: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "alunos",
    timestamps: true,
  }
);

const Nota = require("./Nota");
const Disciplina = require("./Disciplina");

Aluno.hasMany(Nota, {
  foreignKey: "alunoId",
  as: "notas",
});

Nota.belongsTo(Aluno, {
  foreignKey: "alunoId",
  as: "aluno",
});

Aluno.belongsToMany(Disciplina, {
  through: Nota,
  foreignKey: "alunoId",
  otherKey: "disciplinaId",
  as: "disciplinas",
});

Disciplina.belongsToMany(Aluno, {
  through: Nota,
  foreignKey: "disciplinaId",
  otherKey: "alunoId",
  as: "alunos",
});

module.exports = Aluno;
