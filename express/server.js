'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const router = express.Router();

router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Helloy Kitty!</h1>');
    res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
router.get('/api', (req, res) => {
    var content = fs.readFileSync(__dirname + "/todos.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});
app.get('/apis', (req, res) => {
    var content = fs.readFileSync(__dirname + "/todos.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});
app.use('/.netlify/functions/server', router); // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));


module.exports = app;
module.exports.handler = serverless(app);