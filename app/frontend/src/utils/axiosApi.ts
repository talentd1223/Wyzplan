/* eslint-disable */
import axios from 'axios';

let baseRoute = '/api/';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseRoute = 'http://localhost:8000/api/';
}

const axiosInstance = axios.create({
  baseURL: baseRoute,
  timeout: 30000,
  headers: {
    'x-access-token': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
    'Content-Type': 'application/json',
    'accept': 'application/json',
  }
});

// axiosInstance.defaults.headers = {
//   'Cache-Control': 'no-cache',
//   'Pragma': 'no-cache',
//   'Expires': '0',
// };

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    // Prevent infinite loops early
    if (error.response.status === 401 && originalRequest.url === baseRoute+'token/refresh/') {
      window.location.href = '/';
      return Promise.reject(error);
    }

    if (error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized")
    {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken){
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/token/refresh/', {refresh: refreshToken})
            .then((response) => {

              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);

              axiosInstance.defaults.headers['x-access-token'] = "JWT " + response.data.access;
              originalRequest.headers['x-access-token'] = "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch(err => {
              console.log(err)
            });
        }else{
          console.log("Refresh token is expired", tokenParts.exp, now);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/';
        }
      }else{
        console.log("Refresh token not available.");
        window.location.href = '/';
      }
    }


    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance
