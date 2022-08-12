const path = require('path');
const fs = require('fs');

const booksHandler = (req, res, endpoint) => {
  let allStreams = '';
  req.on('data', (stream) => {
    allStreams += stream;
  });
  req.on('end', (err) => {
    if (err) {
      res.end('Notfound', err);
    } else {
      const searchData = new URLSearchParams(allStreams);
      const inputvalue = searchData.get('seaechBook');
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'Books',
        'index.html',
      );
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.end('Notfound', err);
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(data);
          res.end();
        }
      });
    }
  });
};
module.exports = booksHandler;
