import axios from 'axios';

// logs in user
export function callLogin(payload) {
  const body = ({
    username: payload.username,
    password: payload.password,
  });
  console.log({body});
  

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('api/user/login', body, config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

// logs user out
export function callLogout() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('api/user/logout', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}
