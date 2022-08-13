const booksContainer = document.getElementsByClassName('books-container')[0];
const popupDiv = document.getElementsByClassName('popupDiv')[0]
const url = window.location.href;
const inputvalue = url.slice(url.indexOf('q') + 2);
const fetchApi = `https://www.googleapis.com/books/v1/volumes?q=${inputvalue}&maxResults=40`;
fetch('GET', fetchApi, (data) => {
  renderData(data);
}, '');

const renderData = (data) => {
  data.items.map((ele) => {
    const eleVolumeInfo = ele.volumeInfo;
    if (eleVolumeInfo.imageLinks) {
      const bookDiv = document.createElement('div');
      bookDiv.setAttribute('class', 'BookSilder');
      const bookTitle = document.createElement('p');
      bookTitle.textContent = eleVolumeInfo.title;

      const bookImg = document.createElement('img');
      bookImg.src = eleVolumeInfo.imageLinks.thumbnail;
      bookDiv.appendChild(bookImg);
      bookDiv.append(bookTitle);
      booksContainer.appendChild(bookDiv);
      bookDiv.addEventListener('click', () => {
        popup(ele);
      });
    }
  });
};

const popup = (element) => {
    console.log(element.volumeInfo)
  popupDiv.style.display = 'block';
  const eleVolumeInfo = element.volumeInfo;
  const content = document.createElement('div');
  content.setAttribute('class', 'content');

  const addinfo = document.createElement('div');
  content.setAttribute('class', 'addinfo');
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('class', 'closeBtn');
  closeBtn.addEventListener('click', closePopup);
  closeBtn.textContent = 'X';

  const overview = document.createElement('div');
  const bookTitle = document.createElement('p');
  bookTitle.textContent = `Tilte : ${eleVolumeInfo.title}`;

  const authors = document.createElement('p');
  authors.textContent = `authors : ${eleVolumeInfo.authors}`;

  const language = document.createElement('p');
  language.textContent = `language : ${eleVolumeInfo.language}`;

  const maturityRating = document.createElement('p');
  maturityRating.textContent = `language : ${eleVolumeInfo.maturityRating}`;
  overview.append(bookTitle, authors, language,maturityRating);
 
  const imgDiv = document.createElement('div');
  const bookImg = document.createElement('img');
  bookImg.src = eleVolumeInfo.imageLinks.thumbnail;
  imgDiv.appendChild(bookImg);

  addinfo.append(bookImg, overview);
  content.append(closeBtn, addinfo);
  popupDiv.appendChild(content);
};
const closePopup = () => {
  popupDiv.style.display = 'none';
};
