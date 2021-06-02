require("dotenv").config();

const express = require("express");

const app = express();

const boletoRoute = require("./routes/boleto.routes");
const homeRoute = require("./routes/home.routes");

// Diferentes rotas, diferentes arquivos
app.use("/boleto", boletoRoute);
app.use("/", homeRoute);

app.listen(process.env.PORT, () =>
  console.log(`running at port ${process.env.PORT}`)
);