const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 2000;
require("dotenv/config");

app.use(cors());
app.use(bodyParser.json());

// Importar Routes
const postsRoute = require("./routes/posts");

app.use("/seres-da-mitologia", postsRoute);

// Routes
app.get("/", (req, res) => {
  res.send(
    "Digite o caminho http://localhost:2000/seres-da-mitologia para acessar os registros em json."
  );
});

// Conexão com o MongoDB
mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true },
  () => console.log("Conexão com o Mongo DB estabelecida com sucesso")
);

// Localhost
app.listen(PORT, console.log(`🚀 Server released on http://localhost:${PORT}`));
