"use strict"
const express = require('express');
const http = require('http');
const routes = require('./routes');
const trace = require('./trace');


const app = express();
//app.use(express.json());
app.use(express.text());

routes(app);

var port = process.env.PORT || 8000;

http.createServer(app)
  .listen(port, function () {
    trace.log(`express.js pdfizer server is up and running on port: ${port}`);
  });
