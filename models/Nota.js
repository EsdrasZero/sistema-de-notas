const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Aluno = require("./Aluno");
const Disciplina = require("./Disciplina");

const Nota = sequelize.define("Nota", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstSemester: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  secondSemester: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Nota.belongsTo(Aluno, { foreignKey: "alunoId", as: "aluno" });
Nota.belongsTo(Disciplina, { foreignKey: "disciplinaId", as: "disciplina" });

module.exports = Nota;
