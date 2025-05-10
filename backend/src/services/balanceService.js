const db = require('../config/db')

exports.transaction = async (userId, amount, type, category, description, date) => {
    try {
        if (!['deposit', 'withdrawal'].includes(type)) {
            throw new Error('Invalid transaction type. Use "deposit" or "withdrawal".');
        }

        const transaction = db.transaction(() => {
            const stmt = db.prepare(`
                INSERT INTO transactions (user_id, amount, type, category, description, date)
                VALUES (?, ?, ?, ?, ?, ?)
            `);
            stmt.run(userId, amount, type, category, description, date);

            const balanceUpdateStmt = db.prepare(`
                UPDATE users SET balance = balance + ?
                WHERE id = ?
            `);
            balanceUpdateStmt.run(type === 'deposit' ? amount : -amount, userId);
        });

        transaction();
        console.log(`Transaction completed: ${type} of ${amount} for user ${userId}`);
        return { success: true, message: 'Transaction successful' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getBalance = async (userId) => {
    try {
        const stmt = db.prepare('SELECT balance FROM users WHERE id = ?');
        const user = stmt.get(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return { balance: user.balance };
    } catch (error) {
        throw new Error(error.message);
    }
};
