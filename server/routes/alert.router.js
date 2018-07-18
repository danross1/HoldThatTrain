const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Gets all alerts
 */
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    
    pool.query('SELECT * FROM alerts where user_id=$1', [req.params.id])
        .then(response => {
            console.log(response.rows);
            res.send(response.rows);
        }).catch(err => {
            console.log({err});
            res.sendStatus(500);
        })
});

router.get('/route/:id', (req, res) => {
    const route = req.params.id;
    const queryText = `SELECT name, stops.id from stations
        JOIN stops ON stops.station_id=stations.identifier
        WHERE stops.route_id=$1;`
    pool.query(queryText, [route])
        .then(response => {
            console.log(response.rows);
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
    console.log(req.body);
    

    const alertName = req.body.alert.name;
    const user_id = req.body.alert.user_id || null;
    const stop = req.body.alert.stop;
    const when_to_alert = req.body.alert.when_to_alert;

    console.log({user_id});
    

    const queryText = `INSERT INTO alerts(name, user_id, stop_id, when_to_alert) 
    VALUES($1, $2, $3, $4)`;
    
    pool.query(queryText, [alertName, user_id, stop, when_to_alert])
        .then(() => { res.sendStatus(201)})
        .catch(err => { 
            console.log({err});
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    const alertName = req.body.alert.alertName;
    const route = req.body.alert.route;
    const direction = req.body.alert.direction;
    const stop = req.body.alert.stop;
    const when_to_alert = req.body.alert.when_to_alert;
    const alert_id = req.params.id;

    console.log({alertName});
    console.log({alert_id});
    
    

    const queryText = `UPDATE alerts SET name=$1, route=$2, direction=$3,
        stop=$4, when_to_alert=$5 WHERE id=$6`;
    
    pool.query(queryText, [alertName, route, direction, stop, when_to_alert, alert_id])
        .then(response => {
            console.log(response);
            res.sendStatus(200);
        }).catch(err => {
            console.log({err});
            res.sendStatus(500);
        });
})

router.put('/activate/:id', (req, res) => {
    console.log(req.body.alert.id);
    
    let active = req.body.alert.active;
    active = !active;
    
    const alert_id = req.body.alert.id;
    
    queryText = 'UPDATE alerts SET active=$1 WHERE id=$2';

    pool.query(queryText, [active, alert_id])
        .then(response => {
            console.log({response});
            res.sendStatus(200);
        }).catch(err => {
            console.log({err});
            res.sendStatus(500);
        });
})

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