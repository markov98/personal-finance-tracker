const db = require('../config/db')

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
    const getUserStmt = db.prepare('SELECT balance FROM users WHERE username = ?');
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

exports.getBalance = async (email) => {
    const stmt = db.prepare('SELECT balance FROM users WHERE email = ?');
    const user = stmt.get(email);

    if (!user) {
        throw new Error('User not found');
    }

    return { balance: user.balance };
};
