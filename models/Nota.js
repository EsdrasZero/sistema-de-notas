const { DataTypes } = require("sequelize");
const sequelize = require("@config/database");

const Nota = sequelize.define(
  "Nota",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nota: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
  },
  {
    tableName: "notas",
    timestamps: true,
  }
);

module.exports = Nota;
