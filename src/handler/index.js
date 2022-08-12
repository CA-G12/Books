const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

const handler = (res, endpoint) => {
  const filePath = path.join(__dirname, '..', '..', 'public', endpoint);
  const extention = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.end('Notfound', err);
    } else {
      res.writeHead(200, { 'Content-Type': mime.lookup(extention) });
      res.write(data);
      res.end();
    }
  });
};
module.exports = handler;
