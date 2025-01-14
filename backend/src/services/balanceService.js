const db = require('../config/db')

exports.addBalance = async (email, amount) => {
    try {
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
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.removeBalance = async (email, amount) => {
    try {
        // Fetching the user's current balance
        const getUserStmt = db.prepare('SELECT balance FROM users WHERE email = ?');
        const user = getUserStmt.get(email);

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
            WHERE email = ?
        `);
        const info = updateStmt.run(amount, email);

        if (info.changes === 0) {
            throw new Error('Update failed');
        }

        return { message: 'Balance removed successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getBalance = async (email) => {
    try {
        const stmt = db.prepare('SELECT balance FROM users WHERE email = ?');
        const user = stmt.get(email);

        if (!user) {
            throw new Error('User not found');
        }

        return { balance: user.balance };
    } catch (error) {
        throw new Error(error.message);
    }
};
