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

/**
 * Adds an alert to the alerts table
 */
router.post('/', (req, res) => {
    const alertName = req.body.alertName;
    const user_id = req.body.user_id;
    const route = req.body.route;
    const direction = req.body.direction;
    const stop = req.body.stop;
    const when_to_alert = req.body.when_to_alert;
    const active = req.body.active;

    const queryText = `INSERT INTO alerts(name, user_id, route, direction, stop,
        when_to_alert, active) VALUES($1, $2, $3, $4, $5, $6, $7)`;
    
    pool.query(queryText, [alertName, user_id, route, direction, stop, 
        when_to_alert, active])
        .then(() => { res.sendStatus(201)})
        .catch(err => { 
            console.log({err});
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    const alertName = req.body.alertName;
    const route = req.body.route;
    const direction = req.body.direction;
    const stop = req.body.stop;
    const when_to_alert = req.body.when_to_alert;
    const active = req.body.active;
    const alert_id = req.params.id;

    const queryText = `UPDATE alerts SET name=$1, route=$2, direction=$3,
        stop=$4, when_to_alert=$5, active=$6 WHERE id=$7`;
    
    pool.query(queryText, [alertName, route, direction, stop, when_to_alert,
        active, alert_id])
        .then(response => {
            console.log(response);
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