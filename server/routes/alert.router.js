const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
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
        })
});

module.exports = router;