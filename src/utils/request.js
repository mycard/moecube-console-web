import fetch from 'dva/fetch';
import config from '../config';

function parseJSON(response) {
  return response.json();
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let message;
  try {
    message = (await response.json()).message;
  } catch (error) {
    message = response.statusText;
  }

  const error = new Error(message);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(relativeUrl, options) {
  const url = `${config.apiRoot}${relativeUrl}`;
  if (options && !options.headers) {
    Object.assign(options, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  console.log(options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data}));
  // .catch(err => ({ err }));
};

