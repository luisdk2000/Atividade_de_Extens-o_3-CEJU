const jwt = require("jsonwebtoken");

// middleware para validar token
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const verified = jwt.verify(token, "nossosecret");
    req.user = verified;
    next(); // para continuar o fluxo
  } catch (err) {
    res.status(400).json({ message: "O Token é inválido!" });
  }
};

module.exports = checkToken;