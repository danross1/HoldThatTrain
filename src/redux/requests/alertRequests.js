import axios from 'axios';

export function callAlerts(user) {
    console.log({user});
    
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`api/alert/${user.id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}