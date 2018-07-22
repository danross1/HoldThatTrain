import axios from 'axios';

// adds an alert to the alerts table
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

// gets all alerts for a specific user
export function callAlerts(user) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`api/alert/${user.id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// deletes an alert
export function removeAlert(id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  axios.delete(`api/alert/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// toggles the alert's active bool
export function toggleActive(alertToEdit) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    alert: alertToEdit
  };

  axios.put(`api/alert/activate/${alertToEdit.alert_id}`, config)
    .then(response => response.data)
    .catch(error => {throw error.response || error; });
}

// edits an alert
export function updateAlert(alertToEdit) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    alert: alertToEdit
  };

  axios.put(`api/alert/${alertToEdit.alert_id}`, config)
    .then(response => response.data)
    .catch(error => {throw error.response || error; });
}

