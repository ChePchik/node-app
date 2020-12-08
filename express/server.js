'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router); // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
app.get('/', (req, res) => {
    res.send("users");
});
app.get('/api', (req, res) => {

    var content = fs.readFileSync(__dirname + "/todos.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});
app.get('/another', (req, res) => res.json({ route: req.originalUrl }));

module.exports = app;
module.exports.handler = serverless(app);