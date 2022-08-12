const searchInput = document.getElementById('searchiput');
const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('click', (event)=>{
    event.preventDefault()
    const fetchApi=`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=40`

})