const axios = require('axios');
const auth = require('../firebase/firebase');
const cookie = require('./cookie');

const api = 'http://192.168.1.60:8080/mockproject';

function getHeaders() {
  const token = cookie.getCookie('accessToken');
  const headers = {
    accessToken: token,
    'Content-Type': 'application/json',
  };

  return headers;
}

module.exports = {
  postAuth(url, params) {
    return axios.post(api + url, params)
      .then(response => this.checkResponse(response));
  },
  get(url, params = {}) {
    return axios.get(api + url, { headers: getHeaders(), params: params })
      .then(response => this.checkResponse(response));
  },
  post(url, params) {
    return axios.post(api + url, params, { headers: getHeaders() })
      .then(response => this.checkResponse(response));
  },
  put(url, params) {
    return axios.put(api + url, params, { headers: getHeaders() })
      .then(response => this.checkResponse(response));
  },
  delete(url) {
    return axios.delete(api + url, { headers: getHeaders() })
      .then(response => this.checkResponse(response));
  },
  checkResponse(res) {
    if (res.data.status_code === 401 && auth.currentUser) {
      auth.logout();
      localStorage.clear();
      cookie.deleteCookie();

      return false;
    }
    if (res.data.data) {
      return res.data.data;
    } else if (res.data) {
      return res.data;
    }

    return res;
  },
};
