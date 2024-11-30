import axios from 'axios';

const { VITE_VUE_API_URL, VITE_REGCODE_API_URL } = import.meta.env;

// regcode api axios instance
function regcodeAxios() {
  const instance = axios.create({
    baseURL: VITE_REGCODE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  return instance;
}

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    withCredentials: true,
  });
  return instance;
}

export { localAxios, regcodeAxios };
