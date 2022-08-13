const path = require('path');
const fs = require('fs');
const indexhandler = require('./handler/index');
const booksHandler = require('./handler/bookshandle');
const getList = require('./getList');

let filePath = '';
const router = (req, res) => {
  const { method } = req;
  const endpoint = req.url;
  if (method === 'GET') {
    if (endpoint === '/') {
      filePath = path.join(__dirname, '..', 'public', 'index.html');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.end('Notfound', err);
        } else {
          res.writeHeader(200, { 'Content-Type': 'text/html' });
          res.write(data);
          res.end();
        }
      });
    } else if ((endpoint.includes('mainBooks') || endpoint.includes('books'))) {
      booksHandler(req, res, endpoint);
    } else {
      indexhandler(res, endpoint);
    }
  } else if (method === 'POST') {
    if (req.url === '/suggestions') {
      let allTheData = ''; // collect the data chuncks
      req.on('data', (chunkOfData) => {
        allTheData += chunkOfData;
      });
      req.on('end', () => {
        const searchParams = new URLSearchParams(allTheData);

        getList(searchParams.get('search-Book'), (arr) => {
          if (!arr.length) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('No result found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify(arr));
          }
        });
      });
    } else if (req.url === '/getDetailes') {
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
    }
  }
};
module.exports = router;
