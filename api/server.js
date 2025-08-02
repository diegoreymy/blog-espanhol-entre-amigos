const { createServer } = require('http');
const path = require('path');

// Importa el bundle SSR generado por Angular Universal
const server = require(path.join(__dirname, '../dist/espanhol-entre-amigos/server/main.js'));

module.exports = (req, res) => {
  server.app(req, res);
};
