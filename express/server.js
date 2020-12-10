'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');


const router = express.Router();

router.get('/', (req, res) => {
    var html = `
        <div><a href='/.netlify/functions/server/hello'>View /hello route</a></div>
        <div><a href='/.netlify/functions/server/another'>View /another route</a></div>
        <div><a href='/.netlify/functions/server/users'>View /users route</a></div>
        <div><a href='/.netlify/functions/server/api'>View /api route</a></div>
        `
    res.send(html);
})

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.get('/api', (req, res) => {
    var content = fs.readFileSync(path.join(__dirname, './todos.json'), "utf8"); //(__dirname + "/todos.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});
router.get('/users', (req, res) => {
    res.json({
        users: [{
                name: 'steve',
            },
            {
                name: 'jobs',
            },
        ],
    })
})

router.get('/hello/', function(req, res) {
    res.send('hello world')
})


// Setup routes
app.use('/.netlify/functions/server', router); // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

module.exports = app;
module.exports.handler = serverless(app);