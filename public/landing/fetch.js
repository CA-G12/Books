const fetch = (method, endPoint, cb, dataToSend) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (typeof (data) === 'object' && typeof (cb) === 'function') {
          cb(data);
        }
      } else {
        cb(xhr.status);
      }
    }
  };
  xhr.open(method, endPoint, true);
  xhr.send(dataToSend);
};
