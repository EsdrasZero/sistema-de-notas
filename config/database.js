const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false, 
  }
); 


const syncDatabase = async () => {
  try {
    await sequelize.query('DROP TABLE IF EXISTS "disciplinas" CASCADE');
    await sequelize.query('DROP TABLE IF EXISTS "professores" CASCADE');
    await sequelize.query('DROP TABLE IF EXISTS "alunos" CASCADE');
    await sequelize.query('DROP TABLE IF EXISTS "notas" CASCADE');
    await sequelize.query(
      'DROP SEQUENCE IF EXISTS "professores_id_seq" CASCADE'
    );
    await sequelize.query('DROP SEQUENCE IF EXISTS "alunos_id_seq" CASCADE');
    await sequelize.query(
      'DROP SEQUENCE IF EXISTS "disciplinas_id_seq" CASCADE'
    );
    await sequelize.query('DROP SEQUENCE IF EXISTS "notas_id_seq" CASCADE');

    await sequelize.sync({ force: true }); // Use { force: true } para recriar tabelas, { alter: true } para atualizar
    console.log("Banco de dados sincronizado com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  }
};

syncDatabase();

module.exports = sequelize;
