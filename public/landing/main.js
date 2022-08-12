/* eslint-disable no-undef */
const searchInput = document.getElementById('searchiput');
const searchSub = document.getElementById('searchSub');

searchSub.addEventListener('click', (event) => {
  event.preventDefault();
  fetchSender('GET', `Books?q=${searchInput.value}`);
  window.location.href = `Books?q=${searchInput.value}`;
});
