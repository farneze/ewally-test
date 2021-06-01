require("dotenv").config();

const express = require("express");

const app = express();

app.get('/home', (request, response, next) => {
    console.log(request);
    response.send('<h1>Hello World</h1>');
    });

app.listen(process.env.PORT, () =>
  console.log(`running at port ${process.env.PORT}`)
);