
import fetch from 'isomorphic-fetch';
import makeDebug from 'debug';

const debug = makeDebug('foxapi');

export function appendQueryString(url, queryString) {
  if (!queryString) {
    return url;
  }
  const joinWith = url.indexOf('?') != -1 ? '&' : '?';

  return `${url}${joinWith}${queryString}`;
}


function serialize(data) {
  const params = [];
  for (const param in data) {
    if (data.hasOwnProperty(param)) {
      const value = data[param];
      if (value != null) {
        const asString = typeof value != 'string' ? JSON.stringify(value) : value;
        params.push(`${encodeURIComponent(param)}'='${encodeURIComponent(asString)}`);
      }
    }
  }
  return params.join('&');
}


export default function request(method, uri, data, options) {
  const defaultHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
  };

  options = {
    unauthorizedHandler() {
      if (typeof window != 'undefined') {
        window.location.href = '/login';
      }
    },
    credentials: 'same-origin',
    ...options || {},
    method: method.toUpperCase(),
    headers: {
      ...defaultHeaders,
      ...(options && options.headers || {}),
    },
  };

  if (data) {
    if (method.toUpperCase() === 'GET') {
      const queryString = serialize(data);
      if (queryString) {
        uri = appendQueryString(uri, queryString);
      }
    } else {
      options.body = JSON.stringify(data);
    }
  }

  let error = null;

  debug(`${method.toUpperCase()} ${uri}`);
  if (debug.enabled && data) {
    debug(JSON.stringify(data));
  }
  const promise = fetch(uri, options);

  if (options.handleResponse !== false) {
    return promise
      .then(response => {
        debug(`${response.status} ${method.toUpperCase()} ${uri}`);
        if (response.status == 401) {
          options.unauthorizedHandler(response);
        }
        if (response.status < 200 || response.status >= 300) {
          const message = `${method.toUpperCase()} ${uri} responded with ${response.statusText}`;
          error = new Error(message);
          error.response = response;
        }

        return response;
      })
      .then(response => response.text())
      .then(responseText => {
        let json = null;
        if (responseText) {
          try {
            json = JSON.parse(responseText);
          } catch (ex) {
            // invalid json
          }
        }

        if (error) {
          error.responseJson = json;
          throw error;
        }

        return json;
      });
  }

  return promise;
}


