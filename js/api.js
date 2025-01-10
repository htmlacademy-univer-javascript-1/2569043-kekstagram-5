const urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const sendData = (onSuccess, onFail, method, body) =>{
  fetch (
    urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

export const getData = (onSuccess, onFail, method = 'GET') => sendData(onSuccess, onFail, method);
export const postData = (onSuccess, onFail, method = 'POST', body) => sendData(onSuccess, onFail, method, body);
