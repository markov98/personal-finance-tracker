const router = require("express").Router();
const userController = require('./controllers/userController');
const balanceController = require('./controllers/balanceController');

router.get('/', (req, res) => {
    res.send('Welcome to the Finance Tracker API!')
})

router.use('/users', userController);
router.use('/balance', balanceController)

module.exports = router;