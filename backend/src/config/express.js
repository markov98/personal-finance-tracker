const express = require('express');
const cors = require("cors");
const router = require('../router');
const { auth } = require('../middlewares/authMiddleware');

module.exports = () => {
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(auth);
    app.use(router);

    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true,
      }));

    return app;
}