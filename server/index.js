const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/') {
    res.setHeader('content-type', 'text/html');
    res.write(fs.readFileSync('./index.html'));
  }
});

const broadcaster = new WebSocket.Server({ noServer: true });
let clients = [];

broadcaster.on('connection', (client) => {
  clients.push(client);

  client.on('message', (message) => {
    clients.forEach((receiver) => {
      if (receiver === client) {
        return;
      }

      receiver.send();
    });
  });
});

server.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/broadcaster') {
    broadcaster.handleUpgrade(request, socket, head, (ws) => {
      broadcaster.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8887);
