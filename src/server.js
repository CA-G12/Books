const http = require('http');
const fs = require('fs');
const path = require('path');
const { url } = require('inspector');
const router = require('./router');

const types = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.html': 'text/html',
  '.ico': 'image/vnd.microsoft.icon',
  '.png': 'image/png',
  '.json': 'application/json',
};
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      let filePath = path.join(__dirname, '..', 'public', 'index.html');
      console.log(filePath);
      fs.readFile(filePath, (err, file) => {
        if (err) {
          console.log('error:', err);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h1>Internal Server Error</h1>');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(file);
        }
      });
    } else {
      let filePath = path.join(__dirname, '..', 'public', req.url);
      console.log(filePath);
      fs.readFile(filePath, (err, file) => {
        if (err) {
          console.log('error:', err);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h1>Internal Server Error</h1>');
        } else {
          res.writeHead(200, { 'Content-Type': types[req.url.slice(req.url.indexOf('.'))] });
          res.end(file);
        }
      });
    }
  } else {

let allTheData = ''; ////// get the data
    req.on("data", (chunkOfData) => {
      allTheData += chunkOfData;
    });

    req.on("end", () => {
      const searchParams = new URLSearchParams(allTheData); ////URLSearchParams is an api in nodejs browser
    
        console.log(searchParams.get('title'))
    
      /*  let blogPost = searchParams.get("post"); /// get with the key that was in the form //post is the name
      res.writeHead(302, { Location: "/" });
      // const timS = Date.now();
      // let obj = {};
      obj[Date.now()] = blogPost; /// create new object and put the data on it
      obj = JSON.stringify(obj);
      fs.readFile("./src/posts.json", (err, file) => {
        if (err) {
          console.log("error:", err);
        } else {
          ///file is string (json in string)
          file = JSON.parse(file);
          file[Date.now()] = blogPost;
          file = JSON.stringify(file);
          fs.writeFile("./src/posts.json", file, (error) => {
            console.log(error);
          });
        }
      });

      res.end();*/
    });



  }
});

const port = 5500;

server.listen(port, () => {
  console.log('Listening ... ');
});
