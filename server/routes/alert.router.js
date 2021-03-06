const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Gets all alerts from the alerts table
 * 
 */
router.get('/:id', (req, res) => {
    let queryText = `SELECT alerts.id, user_id, stop_id, alerts.name AS alert_name, alerts.direction AS direction_id, directions.direction, when_to_alert, active, routes.name AS route_name, stations.name AS station_name, alerts.route  FROM alerts
        JOIN routes ON alerts.route = routes.id
        JOIN stops ON alerts.stop_id = stops.id
        JOIN stations ON stops.station_id = stations.identifier
        JOIN directions ON alerts.direction = directions.id
        where user_id=$1`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            res.send(response.rows);
        }).catch(err => {
            console.log({err});
            res.sendStatus(500);
        })
});

/**
 * Gets all alerts for a particular route in order to populate selects
 */
router.get('/route/:id', (req, res) => {
    const route = req.params.id;
    const queryText = `SELECT name, stops.id from stations
        JOIN stops ON stops.station_id=stations.identifier
        WHERE stops.route_id=$1;`
    pool.query(queryText, [route])
        .then(response => {
            res.send(response.rows)
        }).catch(err => {
            console.log({err});
            res.sendStatus(500);
        });
    
})

/**
 * Adds an alert to the alerts table
 */
router.post('/', (req, res) => {
    const alertName = req.body.alert.name;
    const user_id = req.body.alert.user_id || null;
    const stop = req.body.alert.stop;
    const route = req.body.alert.route;
    const direction = req.body.alert.direction;
    const when_to_alert = req.body.alert.when_to_alert;

    const queryText = `INSERT INTO alerts(name, user_id, stop_id, when_to_alert, direction, route) 
        VALUES($1, $2, $3, $4, $5, $6)`;
    
    pool.query(queryText, [alertName, user_id, stop, when_to_alert, direction, route])
        .then(() => { res.sendStatus(201)})
        .catch(err => { 
            console.log({err});
            res.sendStatus(500);
        });
});

/**
 * Updates an alert in the alerts table
 */
router.put('/:id', (req, res) => {
    const alertName = req.body.alert.alertName;
    const route = req.body.alert.route;
    const direction = req.body.alert.direction;
    const stop = req.body.alert.stop;
    const when_to_alert = req.body.alert.when_to_alert;
    const alert_id = req.params.id;    
    const queryText = `UPDATE alerts SET name=$1, route=$2, direction=$3,
        stop_id=$4, when_to_alert=$5 WHERE id=$6`;
    
    pool.query(queryText, [alertName, route, direction, stop, when_to_alert, alert_id])
        .then(response => {
            res.sendStatus(200);
        }).catch(err => {
            console.log({err});
            res.sendStatus(500);
        });
})

/**
 * Updates only the active boolean for an alert in the alerts table
 */
router.put('/activate/:id', (req, res) => {
    let active = req.body.alert.active;
    active = !active;
    
    const alert_id = req.body.alert.id;
    queryText = 'UPDATE alerts SET active=$1 WHERE id=$2';

    pool.query(queryText, [active, alert_id])
        .then(response => {
            res.sendStatus(200);
        }).catch(err => {
            console.log({err});
            res.sendStatus(500);
        });
})

/**
 * Removes an alert from the alerts table
 */
router.delete('/:id', (req, res) => {
    let alertToDelete = req.params.id;
    let queryText = `DELETE FROM alerts WHERE id=$1`;
    pool.query(queryText, [alertToDelete])
        .then(() => { res.sendStatus(200); })
        .catch(err => {
            console.log({err});
            res.sendStatus(500);
        });
});

module.exports = router;