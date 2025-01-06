const router = require("express").Router();
const userController = require('./controllers/userController');

router.get('/', (req, res) => {
    res.send('Welcome to the Finance Tracker API!')
})

router.use('/users', userController);

module.exports = router;