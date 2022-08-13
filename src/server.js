const http = require('http');

const router = require('./router');
// const hostname = process.env.HOSTNAME || 'localhost';
const port =3000;
const server = http.createServer(router);
server.listen(port, () => {
  console.log('server is running');

});
