const router = require("express").Router();
const balanceService = require('../services/balanceService');
const { isAuth } = require('../middlewares/authMiddleware');

router.post('/add', isAuth, async (req, res) => {
    try {
        const { email, amount } = req.body;
        const result = await balanceService.addBalance(email, amount);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/remove', isAuth, async (req, res) => {
    try {
        const { email, amount } = req.body;
        const result = await balanceService.removeBalance(email, amount);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/get', isAuth, async (req, res) => {
    try {
        const { email } = req.query;
        const result = await balanceService.getBalance(email);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
