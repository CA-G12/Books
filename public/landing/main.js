/* eslint-disable no-undef */
// handling search input POST requests
searchiput.addEventListener('keyup', (event) => { // listen to any keystroke (letters,enter key,backspace key) events
  if ((event.target.value * 1 === 0)) { // don't send request if the input is empty.
    suggestionsList.setAttribute('style', 'display:none;');
    // send requests only if the pressed key is letter or enter key or bakcspace
  } else if (((event.keyCode >= 65 && event.keyCode <= 90) || event.key === 'Backspace' || event.key === ' ')) {
    const dataTosend = `${event.target.getAttribute('name')}=${event.target.value.trim()}`;
    fetch('POST', '/suggestions', renderSuggestionsList, dataTosend);
  }
});

const searchInput = document.getElementById('searchiput');
const searchSub = document.getElementById('searchSup');

searchSub.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = `Books?q=${searchInput.value}`;
});