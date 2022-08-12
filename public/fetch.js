const fetch = (func, endPoint, cb, dataToSend) => {
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
};
