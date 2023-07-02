import { Server } from 'http';
import 'dotenv/config';
import { apiUsers, newUser, users} from './src/user.js'

const nonExistingResource = "The requested resource does not respond."; 

const hostname = '127.0.0.1';
const port = process.env.SERVER_PORT;

const server = new Server();
 
const requestListener = function (req, res) {

  try {

//    console.log(req.method, req.url);
    if (req.url == apiUsers) {
      switch (req.method) {
        case 'GET':

          res.setHeader('Content-Type', 'text/html');
          res.statusCode = 200;
          res.end(JSON.stringify(users));
        
          break;
      
        case 'POST':

          let body =  [];
          req.on('data', (chunk) => {
            body.push(chunk);
          })
          .on('end', () => {
            body = Buffer.concat(body).toString();
            const userData = JSON.parse(body);

            if (userData) {
          
              const result = newUser(userData);

              res.setHeader('Content-Type', 'text/html');
              res.statusCode = 201;
              res.end(JSON.stringify(result));

            } else {

              res.setHeader('Content-Type', 'text/html');
              res.statusCode = 404;
              res.end('No user data available');

            }
          })
        
          break;

        default:
          console.error('nonExistingResource');
          
          res.setHeader('Content-Type', 'text/html');
          res.statusCode = 404;
          res.end(nonExistingResource);
          
          break;
      }

    } else {
      console.error('nonExistingResource');

      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 404;
      res.end(nonExistingResource);

    }
      
  } catch (error) {
    
    console.error(error.stack);    
    
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.end('Request processing error');
}
  
};

server.on('request', requestListener);

server.on('listening', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 
server.listen(port);
