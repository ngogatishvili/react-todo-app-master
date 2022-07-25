import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use(
  (request) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      request.headers.common.Authorization = `Bearer ${token}`;
      return request;
    }

    return request;
  },
  (error) => Promise.reject(error),
);
