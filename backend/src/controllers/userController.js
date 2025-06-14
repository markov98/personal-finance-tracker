const router = require("express").Router();
const userService = require('../services/userService');
const { isAuth, revokeToken } = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await userService.register(username, email, password);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);

        let status = 500;
        let errMsg = 'An unexpected error occurred during registration.';

        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE' || err.message.includes('UNIQUE constraint failed: users.email')) {
            status = 400;
            errMsg = 'Email is already registered.';
        }

        res.status(status).json({ error: errMsg });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});

router.post("/logout", isAuth, (req, res) => {
    revokeToken(req.token);
    res.json({ message: "Logout successful!" });
});

router.get("/get/:id", isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.getUser(id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message });
    }
});

module.exports = router;