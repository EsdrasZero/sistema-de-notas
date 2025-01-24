const { DataTypes } = require("sequelize");
const sequelize = require("@config/database");

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

Aluno.hasMany(Nota, {
  foreignKey: "alunoId",
  as: "notas",
});

Nota.belongsTo(Aluno, {
  foreignKey: "alunoId",
  as: "aluno",
});

module.exports = Aluno;
