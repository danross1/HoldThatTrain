const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const moment = require('moment');

// auth for Twilio API
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

let activeAlerts = [];
let apiURL = '';

/*
* A function that gets all the active alerts in the alerts table 
* (as well as any necessary data from other tables)
*/
function selectAllActiveAlerts() {
    let queryText = `SELECT alerts.id, alerts.name AS alert, station_id, route_id, direction, when_to_alert, phone, stations.name AS station, routes.name AS route FROM alerts 
        JOIN stops ON alerts.stop_id = stops.id
        JOIN person ON alerts.user_id = person.id
        JOIN stations ON stops.station_id = stations.identifier
        JOIN routes ON alerts.route = routes.id
        WHERE active=true;`;
    pool.query(queryText)
        .then(response => {
            activeAlerts = response.rows;
        }).catch(err => {
            console.log({err});
        })
}

/*
* A function that loops through all active alerts and sends a get call to the NexTrip API,
* the response is then used to check for time differences.
*/
function loopThroughActiveAlerts() {
    for(alert of activeAlerts) {
        apiURL = `http://svc.metrotransit.org/NexTrip/${alert.route_id}/${alert.direction}/${alert.station_id}?format=json`;

        axios.get(apiURL).then(response => {
            let timeOfArrival = moment(response.data[0].DepartureTime);
            console.log({timeOfArrival});
            
            checkTimeDifference(timeOfArrival, alert);
        }).catch(err => {
            console.log({err});
        });
        
    }
}
/*
* A function that checks the difference between the next scheduled departure and the current time.
* If this difference is less than or equal to the alert's when_to_alert, 
* first notify the user then deactive the alert
*/
function checkTimeDifference(timeOfArrival, alert) {
    let currentTime = moment();
    let timeDiff = moment(timeOfArrival.diff(currentTime)).format('m');
    // if this was in production, this would only notify the user when the timeDiff = when_to_alert,
    // this way the user doesn't get a message, for example, if the train is one minute away when they 
    // activate the alert but they wish to be alerted ten minutes before the train arrives
    if(timeDiff <= alert.when_to_alert) {
        sendTwilioMessage(alert, timeDiff);
        deactivateAlert(alert.id);
    }
}
/*
* A function that constructs a message using the alert information 
* and sends the user a message using the Twilio API
*/
function sendTwilioMessage(alert, timeDiff) {
    twilio.messages
        .create({
            body: `Your ${alert.route} train is arriving at ${alert.station} in ${timeDiff} minutes!  Go catch that train!`,
            from: '+12399709412',
            to: alert.phone
        })
        .then(message => console.log(message.sid))
        .done();
}
/*
* A function that deactivates the alert after the Twilio message has been sent
*/
function deactivateAlert(alert_id) {
    let queryText = `UPDATE alerts SET active=false WHERE id=$1`;
        pool.query(queryText, [alert_id])
            .then(response => {
            }).catch(err => {
                console.log({err});
            });
}
/*
* A function that joins all the functionality of the file together so that it may be exported easily.
*/
async function checkAlerts() {    
    selectAllActiveAlerts();

    await new Promise(resolve => {setTimeout(resolve, 100)})
    
    loopThroughActiveAlerts();
}

module.exports = checkAlerts;