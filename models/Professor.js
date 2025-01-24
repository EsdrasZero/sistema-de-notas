const { DataTypes } = require("sequelize");
const sequelize = require("@config/database");

const Professor = sequelize.define(
  "Professor",
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "professores",
    timestamps: true,
  }
);

const Disciplina = require("./Disciplina");

Professor.hasMany(Disciplina, {
  foreignKey: "professorId",
  as: "disciplinas",
});

Disciplina.belongsTo(Professor, {
  foreignKey: "professorId",
  as: "professor",
});

module.exports = Professor;
