import { Server } from 'http';
import 'dotenv/config';

const hostname = '127.0.0.1';
const port = process.env.SERVER_PORT;

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