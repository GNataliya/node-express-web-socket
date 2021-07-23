
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

// HTTP Server
const sendFile = (res, filePath, type) => {
  const fullFilePath = `${__dirname}/${filePath}`; 
  res.writeHead(200, {
    'Content-Type': type
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
  };


 // http сервер отдает одним роутом html и другим js файлы
const httpServer = http.createServer((req, res) => {

  if(req.url === '/') {                                             
    sendFile(res, 'views/main.html', 'text/html');                 
  return
  };

  if(req.url === '/js/mainClient.js') {
    sendFile(res, 'public/js/mainClient.js', 'application/javascript');
  return
  };

  res.writeHead(404);
  res.end();
});

httpServer.listen(8000, () => {
  console.log((new Date()) + 'http Server is listening on port 8000');
});


// WS Server
const wsServer = new WebSocket.Server({ server: httpServer });    // приатачили ws server к обычному http 

wsServer.on('connection', (socket) => {
  
  socket.on('message', (data) => {
    console.log(`Frontend send ${data}`);
    // console.log(`Socket ID ${socket.id} send ${data}`);
  });

  socket.send('I got info');
});


// example :)
// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     console.log('received: %s', message);
//   });

//   ws.send('something');
// })
