const jwt = require("jsonwebtoken");
const config = require("../config/config");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "O token não foi enviado" });
  }

  const parts = authHeader.split(" ");

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Erro token com formato incorreto" });
  }

  jwt.verify(token, config.jwt_key, (error, data) => {
    if (error) {
      return res
        .status(401)
        .send({ output: `Ocorreu um erro ao validar o token ${error}` });
    }

    req.content = {
      id: data._id,
      user: data.username,
      name: data.name,
    };

    return next();
  });
};

module.exports = auth;
