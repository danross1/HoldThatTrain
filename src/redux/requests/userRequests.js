import axios from 'axios';

export function callUser() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('api/user', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function edit(user) {
  console.log({user});
  
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    userToEdit: user
  };

  axios.put('api/user', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}