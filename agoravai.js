const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const PRIVATE_KEY = fs.readFileSync(
  path.join(__dirname, "jwtRS256.key"),
  "utf8"
);

console.log(": PRIVATE_KEY", PRIVATE_KEY)

const PUBLIC_KEY = fs.readFileSync(
  path.join(__dirname, "jwtRS256.key.pub"),
  "utf8"
);

const app = express();
const PORT = 3333;

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear o corpo das requisições
app.use(express.json());

function gerarJWT(user, nonce) {
  const payload = {
    sub: user.id,
    email: user.email,
    given_name: user.firstName,
    family_name: user.lastName,
    iat: Math.floor(Date.now() / 1000),
    nonce: nonce, // <- recebido na URL da Freshworks
  };

  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: "RS256",
  });

	console.log(": gerarJWT -> token", token)

  return token;
}

// Em seu endpoint GET /sso/jwt/login
app.get("/sso/jwt/login", (req, res) => {
  const { state, nonce } = req.query;

  // 1. Valide o usuário logado
  const user = {
    id: "123456",
    email: "suporte1@rmview.com",
    firstName: "Herick",
    lastName: "Vasconcelos",
  };

  // 2. Gere o token
  const token = gerarJWT(user, nonce);

  // 3. Redirecione para o Freshworks
  const redirectUrl = `https://rmview-org.myfreshworks.com/sp/OIDC/832276755116961659/implicit?state=${state}&id_token=${token}`;

  return res.redirect(redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
