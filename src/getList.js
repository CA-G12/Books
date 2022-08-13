const fs = require('fs');
const path = require('path');

const getList = (input, cb) => {
  /* const obj = {
    p: [
      'Persuasion',
      'Pride and Prejudice',
      'Poems',
      'Poems',
      'Pippi Longstocking',
      'Pedro Páramo',
    ],
    t: [
      'The Great Gatsby',
      'The Chrysalids',
      'The Adventures of Sherlock Holmes',
      'The Picture of Dorian Gray',
      'The Yellow Wallpaper',
      'The Count of Monte Cristo, Illustrated',
      'The Great Gatsby',
      'The Iliad',
      'The Prince',
      'The Strange Case of Dr. Jekyll and Mr. Hyde',
      'The Adventures of Tom Sawyer, Complete',
      'Things Fall Apart',
      'The Divine Comedy',
      'The Epic Of Gilgamesh',
      'The Book Of Job',
      'The Decameron',
      'The Stranger',
      'The Canterbury Tales',
      'The Idiot',
      'The Possessed',
      'The Brothers Karamazov',
      'The Sound and the Fury',
      'The Tin Drum',
      'The Devil to Pay in the Backlands',
      'The Old Man and the Sea',
      'The Trial',
      'The Castle',
      'The recognition of Shakuntala',
      'The Sound of the Mountain',
      'The Golden Notebook',
      'The Magic Mountain',
      'The Tale of Genji',
      'The Man Without Qualities',
      'The Book of Disquiet',
      'Tales',
      'The Masnavi',
      'The Red and the Black',
      'The Life And Opinions of Tristram Shandy',
      'The Death of Ivan Ilyich',
      'The Adventures of Huckleberry Finn',
      'The Aeneid',
      'To the Lighthouse',
    ],
    o: [
      'Old Granny Fox',
      'One Thousand and One Nights',
      'One Hundred Years of Solitude',
      'Odyssey',
      'Othello',
      'Oedipus the King',
    ],
    i: [
      'I Capture The Castle',
      'Invisible Man',
      'Iliad',
      'Independent People',
      'In Search of Lost Time',
    ],

  }; */
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
