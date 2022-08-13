const fs = require('fs');
const path = require('path');

const getList = (input, cb) => {
  const filePath = path.join(__dirname, 'books.json');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const obj = JSON.parse(data);
      const keyy = input[0];
      if (!keyy || !(keyy in obj)) {
        return;
      }

      for (const arr in obj) {
        obj[arr].sort();
      }

      const arr = [...obj[keyy]];

      let start;
      let end;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].slice(0, input.length).toLowerCase() === input.toLowerCase()) {
          start = i;
          break;
        }
      }
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].slice(0, input.length).toLowerCase() === input.toLowerCase()) {
          end = i;
          break;
        }
      }
      const newArr = [];

      if (end - start > 6) {
        end = start + 5;
      }

      for (let i = start; i <= end; i++) {
        newArr.push(arr[i]);
      }

      cb(newArr);
    }
  });
};

module.exports = getList;
