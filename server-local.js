'use strict';
var Port = process.env.PORT || 5051;
const app = require('./express/server');

app.listen(Port, () => console.log('\x1b[33m%s\x1b[0m', `На хосте http://localhost:${Port}/`));