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

export function addAlert(newAlert) {

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    alert: newAlert
  };

  axios.post('api/alert', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function removeAlert(id) {
  console.log({id});
  
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  axios.delete(`api/alert/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}