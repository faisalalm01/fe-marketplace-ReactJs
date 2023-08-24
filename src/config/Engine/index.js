import axios from 'axios';
import { getData, objectString } from '../../utils/index';
// import { getData, objectString } from '@/utils/index.js';

const req = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

req.interceptors.request.use(
  async (config) => {
    await getData('access_token').then((res) => {
      if (res && config.url !== '') {
        return (config.headers['access_token'] = 'Bearer ' + res.replace(/\"|\\/g, ''));
      }
    });

    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const requestPost = (url, params) => {
  return new Promise((resolve, reject) => {
    req
      .post(`${url}`, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const requestGet = (url, params) => {
  return new Promise((resolve, reject) => {
    req
      .get(`${url}${params ? params : ''}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const requestPut = (url, params, body) => {
  return new Promise((resolve, reject) => {
    req
      .put(`${url}${params ? objectString(params) : ''}`, body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const requestDelete = (url, body) => {
  return new Promise((resolve, reject) => {
    req
      .delete(`${url}`, {
        data: body,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const requestAnyGet = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    req
      .get(
        `${url}${objectString(params)}`,
        headers && {
          headers: headers,
        },
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const requestPostMultipart = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    req
      .post(
        `${url}`,
        params,
        headers && {
          headers: headers,
        },
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
