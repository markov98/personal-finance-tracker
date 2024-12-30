const router = require("express").Router();

router.get('/', (req, res) => {
    res.send('Wolcome to the Finance Tracker API!')
})

module.exports = router;