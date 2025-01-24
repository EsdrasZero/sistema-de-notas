const { DataTypes } = require("sequelize");
const sequelize = require("@config/database");

const Disciplina = sequelize.define(
  "Disciplina",
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
  },
  {
    tableName: "disciplinas",
    timestamps: true,
  }
);
const Nota = require("./Nota");

Disciplina.hasMany(Nota, {
  foreignKey: "disciplinaId",
  as: "notas",
});

Nota.belongsTo(Disciplina, {
  foreignKey: "disciplinaId",
  as: "disciplina",
});

module.exports = Disciplina;
