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

router.get('/get-transactions', isAuth, async (req, res) => {
    try {
        const { userId } = req.query;
        const result = await balanceService.getTransactions(userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/transactions/:id', isAuth, async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.user._id;
        const result = await balanceService.getTransactionDetails(userId, transactionId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/get-balance', isAuth, async (req, res) => {
    try {
        const { userId } = req.query;
        const result = await balanceService.getBalance(userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
