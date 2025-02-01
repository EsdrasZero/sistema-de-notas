const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Disciplina = sequelize.define("Disciplina", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Disciplina;
