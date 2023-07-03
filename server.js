import { Server } from 'http';
import 'dotenv/config';
import { apiUsers, checkUserData, getApiUsersUUID, getUser, newUser, users} from './src/user.js'

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

              const check = checkUserData(userData);

              if (Object.keys(check).length == 0) {
                  
                const result = newUser(userData);
                
                console.log(JSON.stringify(result));

                res.setHeader('Content-Type', 'text/html');
                res.statusCode = 201;
                res.end(JSON.stringify(result));
              } else {
                console.log(JSON.stringify(check));

                res.setHeader('Content-Type', 'text/html');
                res.statusCode = 400;
                res.end(JSON.stringify(check));
              }
            } else {
              console.log('No user data available');

              res.setHeader('Content-Type', 'text/html');
              res.statusCode = 400;
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

      return;
    } 
      

    const urlArray = req.url.split('/');
    //!!!!!!
    console.log(urlArray);
    let uuidUser = '';

    if (urlArray.length === 4) {
      uuidUser = getApiUsersUUID(req.url)
    }

    if (urlArray.length === 4 && uuidUser === '' && urlArray[1] === 'api' && urlArray[2] === 'users') {
      if (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') {
        const errorMessage = 'userId is invalid (not uuid)!';
        console.error(errorMessage);
  
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.end(errorMessage);
  
        return;
 
      }
    }

    if ((uuidUser != '' && urlArray[1] === 'api' && urlArray[2] === 'users') 
      && (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE')) {

      switch (req.method) {
        case 'GET':
          const getResult = getUser(uuidUser);
          if (getResult.length > 0) {

            console.log(JSON.stringify(getResult[0]));

            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end(JSON.stringify(getResult[0]));
  
          } else {
            console.log(`User with id === ${uuid} doesn't exist`);

            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end(`User with id === ${uuid} doesn't exist`);
          }
          
          break;
      
        case 'PUT':
        
          console.log(req.method);  
          break;
  
        case 'DELETE':
        
          console.log(req.method);  
          break;
  
      }

      return;
    }


    console.error('nonExistingResource');

    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.end(nonExistingResource);

      
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
