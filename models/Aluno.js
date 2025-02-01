const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Aluno = sequelize.define("Aluno", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Aluno;
