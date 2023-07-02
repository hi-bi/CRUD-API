import { Server } from 'http';
import 'dotenv/config';
import {users} from './src/user.js'

const nonExistingResource = "The requested resource does not respond."; 

const hostname = '127.0.0.1';
const port = process.env.SERVER_PORT;

const server = new Server();
 
const requestListener = function (req, res) {

  try {
    res.setHeader('Content-Type', 'text/html');

    switch (req.method) {
      case ('GET'):
        switch (req.url) {
          case '/':
            res.writeHead(200);
            res.end('Hello!');
            break;

          case '/api/users':
            res.writeHead(200);
            res.end(JSON.stringify(users));
            break;
      
            default:
              res.writeHead(404);
              res.end(nonExistingResource);
            break;
        }
        
        break;
    
      default:
        res.writeHead(404);
        res.end(nonExistingResource);
      break;
    }
  
    
  } catch (error) {
    console.error('');    
  }
  
};

server.on('request', requestListener);

server.on('listening', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 
server.listen(port);

