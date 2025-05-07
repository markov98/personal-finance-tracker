const router = require("express").Router();
const balanceService = require('../services/balanceService');
const { isAuth } = require('../middlewares/authMiddleware');

router.post('/transaction', isAuth, async (req, res) => {
    try {
        const { userId, amount, type, category, description, date } = req.body;
        const result = await balanceService.transaction(userId, amount, type, category, description, date);
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
