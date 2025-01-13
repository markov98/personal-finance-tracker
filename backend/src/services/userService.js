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

exports.addBalance = async (email, amount) => {
    const stmt = db.prepare(`
        UPDATE users 
        SET balance = balance + ?
        WHERE email = ?
    `);
    
    const info = stmt.run(amount, email);
    
    if (info.changes === 0) {
        throw new Error('User not found or update failed');
    }
    
    return { message: 'Balance updated successfully' };
};

exports.removeBalance = async (username, amount) => {
    // Fetching the user's current ballance
    const getUserStmt = db.prepare('SELECT balance FROM users WHERE id = ?');
    const user = getUserStmt.get(userId);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.balance < amount) {
        throw new Error('Insufficient balance');
    }

    // If enough balance, proceed to update it
    const updateStmt = db.prepare(`
        UPDATE users
        SET balance = balance - ?
        WHERE username = ?
    `);
    const info = updateStmt.run(amount, username);

    if (info.changes === 0) {
        throw new Error('Update failed');
    }

    return { message: 'Balance removed successfully' };
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
