const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');

let activeAlerts = [];
async function checkAlerts() {
    // SELECT ALL ACTIVE INPUTS
    let queryText = `SELECT user_id, name, station_id, route_id FROM alerts 
        JOIN stops ON alerts.stop_id = stops.id
        WHERE active=true;`;
    pool.query(queryText)
        .then(response => {
            activeAlerts = response.rows;
            console.log({activeAlerts});
        }).catch(err => {
            console.log({err});
        })

    await new Promise(resolve => {setTimeout(resolve, 1000)})

    // FOR ALL ACTIVE INPUTS
    for(alert of activeAlerts) {
        let apiURL = `http://svc.metrotransit.org/NexTrip/${alert.route_id}/${alert.direction}/${alert.stop}`;
        axios.get(apiURL)
        
    }
    // GET THE TIME_TO_NEXT_DEPARTURE

    // IF TIME_TO_NEXT_DEPARTURE <= WHEN_TO_ALERT

    // TWILIO MESSAGE ALERT
}

checkAlerts();

module.exports = checkAlerts;