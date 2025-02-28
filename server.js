const http = require('http');
const app = require('./app');
require('dotenv').config;

const port = 3000 || process.env.PORT;
const server = http.createServer(app);

server.listen(port);