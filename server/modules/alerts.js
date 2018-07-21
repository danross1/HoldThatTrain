const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const moment = require('moment');

// auth for Twilio API
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

let activeAlerts = [];
async function checkAlerts() {    
    // SELECT ALL ACTIVE INPUTS
    let queryText = `SELECT alerts.id, name, station_id, route_id, direction, when_to_alert, phone FROM alerts 
        JOIN stops ON alerts.stop_id = stops.id
        JOIN person ON alerts.user_id = person.id
        WHERE active=true;`;
    pool.query(queryText)
        .then(response => {
            activeAlerts = response.rows;
            console.log({activeAlerts});
        }).catch(err => {
            console.log({err});
        })

    await new Promise(resolve => {setTimeout(resolve, 1000)})
    
    let apiURL = '';
    for(alert of activeAlerts) {
        apiURL = `http://svc.metrotransit.org/NexTrip/${alert.route_id}/${alert.direction}/${alert.station_id}?format=json`;
        axios.get(apiURL).then(response => {
            console.log(response.data[0]);
            let timeOfArrival = moment(response.data[0].DepartureTime);
            console.log({timeOfArrival});
            let currentTime = moment();
            console.log({currentTime});
            
            console.log(alert.when_to_alert);
            
            let timeDiff = moment(timeOfArrival.diff(currentTime)).format('m');
            console.log({timeDiff});
            if(timeDiff <= alert.when_to_alert) {
                twilio.messages
                    .create({
                        body: `Your train at ${alert.station_id} is arriving soon!  Go catch that train!`,
                        from: '+12399709412',
                        to: alert.phone
                    })
                    .then(message => console.log(message.sid))
                    .done();
                let queryText = `UPDATE alerts SET active=false WHERE id=$1`;
                pool.query(queryText, [alert.id])
                    .then(response => {
                        console.log({response});
                    }).catch(err => {
                        console.log({err});
                    });
            }
            
        }).catch(err => {
            console.log({err});
            
        });
        
    }
}

checkAlerts();

module.exports = checkAlerts;