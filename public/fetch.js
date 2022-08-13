/* eslint-disable no-unused-vars */
function fetch(func, endPoint, cb, dataToSend) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const receivedData = JSON.parse(xhr.responseText);
        cb(receivedData);
      } else {
        console.error(xhr.responseText);
      }
    }
  };
  xhr.open(func, endPoint, true);
  xhr.send(dataToSend);
}
function fetchSender(method, endPoint) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, endPoint, true);
  xhr.send();
}
