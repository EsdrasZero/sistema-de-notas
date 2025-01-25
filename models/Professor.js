const { DataTypes } = require("sequelize");
const sequelize = require("@config/database");
const bcrypt = require("bcrypt");

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
    hooks: {
      beforeCreate: async (professor) => {
        if (professor.senha) {
          professor.senha = await bcrypt.hash(professor.senha, 10); // Hash da senha
        }
      },
    },
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
