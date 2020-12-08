'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<a href="/api>api</h1>');
    res.end();
});

app.get('/api', (req, res) => {

    var content = fs.readFileSync(__dirname + "/todos.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);