const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
const PORT = 3333;

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear o corpo das requisições
app.use(express.json());

// Proxy: redireciona todas as requisições para a API externa
app.use('/', async (req, res) => {
  const path = req.path;
  const method = req.method;
  const headers = req.headers;

  console.log(`https://api.clashofclans.com${path}`)

  const response = await axios.get({
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.clashofclans.com${path}`,
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjZhMWRkYWNhLTk3YzktNDhhZS1iZTkyLTQ5ZTUxZmYyZjg2NiIsImlhdCI6MTc0Mzg4MzExMiwic3ViIjoiZGV2ZWxvcGVyLzcwNjdhNDNmLTJkNTItMjg5Mi0xYzJmLTY2YmVjZWRmYTk1NyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3MC44NC4xNjcuMTAxIl0sInR5cGUiOiJjbGllbnQifV19.iQBwsuqFfaE7MEVyWqcB1sgSwhR4U8o_kvVnts0lHw8V5OkluZELzfRIH8o1g1XAyFRXXvtQhj5J6DywKVpoQg'
    },
  }).catch((error) => {
    console.error('Erro ao fazer a requisição:', error);
    res.status(500).send('Erro ao fazer a requisição para a API externa');
  });

  res.status(response.status);
  res.json(response.data).send();
});

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});

