import { Server } from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = new Server();
 
server.on('request', (req, res) => {
  res.statusCode = 200;
  res.setHeader('content-type', 'text/html');

  res.end('Hello!');
});
 
server.on('listening', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 
server.listen(port);