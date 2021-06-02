require("dotenv").config();

const express = require("express");

const app = express();

const boletoRoute = require("./routes/boleto.routes");
const homeRoute = require("./routes/home.routes");

// Rota para apenas boleto. Desvia-se todas as outras
app.use("/boleto", boletoRoute);
app.use("/", homeRoute);

// Porta definida no arquivo .env
app.listen(process.env.PORT, () =>
  console.log(`running at port ${process.env.PORT}`)
);