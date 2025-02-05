const Professor = require("../models/Professor"); 
const authController = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      
      const professor = await Professor.findOne({ where: { email } });
      if (!professor) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      
      if (senha !== professor.senha) {
        return res.status(401).json({ error: "Senha inválida." });
      }

      return res.json({
        message: "Login realizado com sucesso!",
        professorId: professor.id,
        email: professor.email,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao realizar login." });
    }
  },

  trocarSenha: async (req, res) => {
    const { email, senhaAntiga, senhaNova } = req.body;

    try {
      
      const professor = await Professor.findOne({ where: { email } });
      if (!professor) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      
      if (senhaAntiga !== professor.senha) {
        return res.status(401).json({ error: "Senha antiga inválida." });
      }

      
      professor.senha = senhaNova;
      await professor.save();

      return res.json({ message: "Senha atualizada com sucesso!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar senha." });
    }
  },
};

module.exports = authController;
