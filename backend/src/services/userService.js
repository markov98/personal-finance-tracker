const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../config/db')
const { SECRET } = require("../constants");

exports.register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(`
        INSERT INTO users (username, email, password, balance)
        VALUES (?, ?, ?, 0.0)
    `);
    
    const info = stmt.run(username, email, hashedPassword);
    
    const user = { id: info.lastInsertRowid, email };
    return getResult(user);
};

exports.login = async (email, password) => {
    const stmt = db.prepare('SELECT id, email, username, password FROM users WHERE email = ?');
    const user = stmt.get(email);

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }

    return getResult(user);
};

function getResult(user) {
    const payload = { _id: user.id, email: user.email };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    const result = {
        _id: user.id,
        accessToken: token,
        email: user.email,
    };

    return result;
}
