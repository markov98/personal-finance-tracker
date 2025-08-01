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
        throw new Error('Incorrect username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Incorrect username or password');
    }

    return getResult(user);
};

exports.getUser = async (id) => {
    const stmt = db.prepare('SELECT id, email, username, balance FROM users WHERE id = ?');
    const user = stmt.get(id);

    if (!user) {
        throw new Error('User not found');
    }

    return getResult(user);
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
    const stmt = db.prepare('SELECT password FROM users WHERE id = ?');
    const user = stmt.get(userId);

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
        throw new Error('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updateStmt = db.prepare('UPDATE users SET password = ? WHERE id = ?');
    updateStmt.run(hashedNewPassword, userId);

    return { message: 'Password changed successfully' };
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
