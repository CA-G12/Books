const searchiput = document.querySelector('#searchiput');
const suggestionsList = document.querySelector('ul');

const renderNode = (node) => {
  const span = document.createElement('span');
  let text = node;
  if (node.length > 40) {
    text = `${node.slice(0, 35)} ...`;
  }
  span.innerText = text;
  const div = document.createElement('div');
  div.append(span);
  const li = document.createElement('li');
  li.setAttribute('data-view-type', '1');
  li.setAttribute('role', 'presentation');
  li.append(div);
  return li;
};

const renderSuggestionsList = (data) => {
  if (suggestionsList) {
    suggestionsList.innerHTML = '';
  }
  suggestionsList.setAttribute('style', 'display:initial;');
  if (typeof (data) === 'object') {
    data.map((node) => {
      const li = renderNode(node);
      li.addEventListener('mouseover', (event) => { // when hovering the mouse over a suggestion place it in the search bar
        searchiput.value = event.target.innerText;
      });

      li.addEventListener('click', (event) => { // when clicking on suggestion fire a POST request to fetch the details about it from the external API
        const dataTosend = `${searchiput.getAttribute('name')}=${event.target.innerText}`;

        fetch('POST', '/getDetailes', () => {
          // console.log('gotcha!')
        }, dataTosend);
      });
      suggestionsList.append(li);
    });
  } else if (data === 500) { // if there was a server internal error show a msg to user
    const alert = document.createElement('span');
    alert.setAttribute('style', 'color:#e96b6b;font-size:25px');
    alert.innerText = 'No data found!';
    suggestionsList.append(alert);
  } else {
    console.error(`ERR NO ${data}`);
  }
};
