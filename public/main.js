
const ele = document.querySelector('#searchiput');

const fetch = (title,cb) => {
  const xhr = new XMLHttpRequest();
 
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        /* for (let blogPost in data) {
                     const postDiv = document.createElement('div');
                     const postText = document.createElement('p');
                     const thumbnail = document.createElement('img');
                     const postContainer = document.getElementsByClassName(
                         'post-container'
                     )[0];
                     thumbnail.src = './public/img/logo2.png';
                     thumbnail.className = 'thumbnail';
                     postText.innerHTML = data[blogPost];
                     postDiv.className = 'post';
                     postDiv.appendChild(thumbnail);
                     postDiv.appendChild(postText);
                     postContainer.appendChild(postDiv);
 */
        cb(data);
      } else {
        console.error(xhr.responseText);
      }
    }
  };
  xhr.open('POST', '/suggestions', true);
  xhr.send(`title=${title}`);
 
};

ele.addEventListener('keyup', (event) => {
  if ((event.keyCode >= 65 && event.keyCode <= 90) || event.key === 'Backspace' || event.key === ' ') {
    //console.log(event.target.value);
    fetch(event.target.value,(data)=>{
        console.log(data)
    })
  }
});
