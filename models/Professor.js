const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Corrigido o caminho de importação

class Professor extends Model {}

Professor.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Professor",
    tableName: "professores", // Certifique-se de que o nome da tabela está em minúsculas
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
