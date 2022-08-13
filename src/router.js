const path = require('path');
const fs = require('fs');
const indexhandler = require('./handler/index');
const booksHandler = require('./handler/bookshandle');

let filePath = '';
const router = (req, res) => {
  const { method } = req;
  const endpoint = req.url;
  console.log(endpoint,5);
  if (endpoint === '/' && method === 'GET') {
    console.log(endpoint,444);
    filePath = path.join(__dirname, '..', 'public', 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.end('Notfound', err);
        console.log(err);
      } else {
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  } else if (
    (endpoint.includes('style')
      || endpoint.includes('main')
      || endpoint.includes('background'))
    && method === 'GET' && (endpoint.includes('landing') || endpoint.includes('assert'))
  ) {
    console.log(endpoint);
    indexhandler(res, endpoint);
  } else if (endpoint.includes('/Books') && method === 'GET') {
     console.log(endpoint);
    filePath = path.join(__dirname, '..', 'public', 'Books', 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.end('Notfound', err);
      } else {
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  } else if ((endpoint.includes('mainBooks') || endpoint.includes('books')) && method === 'GET') {
    booksHandler(req, res, endpoint);
  } else if (endpoint.includes('fetch') || endpoint.includes('Dom')) {
    filePath = path.join(__dirname, '..', 'public', endpoint);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.end('Notfound', err);
      } else {
        res.writeHeader(200, { 'Content-Type': 'text/javascript' });
        res.write(data);
        res.end();
      }
    });
  }else{
    console.log(endpoint);
  }
};
module.exports = router;
