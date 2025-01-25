const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Professor = require("@models/Professor");

const authController = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      // Verificar se o professor existe
      const professor = await Professor.findOne({ where: { email } });
      if (!professor) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Validar a senha
      const senhaValida = await bcrypt.compare(senha, professor.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: "Senha inválida." });
      }

      // Gerar o token JWT
      const token = jwt.sign(
        { id: professor.id, email: professor.email },
        process.env.JWT_SECRET, // Segredo no arquivo .env
        { expiresIn: "8h" } // Token expira em 8 horas
      );

      return res.json({
        message: "Login realizado com sucesso!",
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao realizar login." });
    }
  },
};

module.exports = authController;
