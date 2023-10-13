const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression"); // Middleware de compressão
const helmet = require("helmet"); // Middleware de segurança
require("dotenv/config");

const PORT = process.env.PORT || 2000; // Use uma variável de ambiente para a porta

app.use(cors());
app.use(bodyParser.json());
app.use(compression()); // Habilitar compressão Gzip
app.use(helmet()); // Usar middleware Helmet para segurança

// Importar Routes
const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

// Routes
app.get("/", (req, res) => {
  res.send(
    "Digite o caminho http://localhost:" +
      PORT +
      "/posts para acessar os registros em json."
  );
});

// Conexão com o MongoDB
mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true }, // Use o novo mecanismo de descoberta
  () => console.log("Conexão com o MongoDB estabelecida com sucesso")
);

// Lidar com erros 404
app.use((req, res) => {
  res.status(404).send("Rota não encontrada.");
});

// Localhost
app.listen(PORT, () => {
  console.log(`🚀 Servidor lançado na porta ${PORT}`);
});
