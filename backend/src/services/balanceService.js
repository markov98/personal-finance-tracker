const db = require('../config/db')

exports.transaction = async (userId, amount, type, category, description, date) => {
    if (!['income', 'expense'].includes(type)) {
        throw new Error('Invalid transaction type. Use "income" or "expense".');
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
        balanceUpdateStmt.run(type === 'income' ? amount : -amount, userId);
    });

    transaction();
    console.log(`Transaction completed: ${type} of ${amount} for user ${userId}`);
    return 'Transaction successful';
};

exports.getTransactions = async (userId) => {
    const stmt = db.prepare(`
            SELECT id, amount, type, category, description, date
            FROM transactions
            WHERE user_id = ?
            ORDER BY date DESC
        `);
    const transactions = stmt.all(userId);

    if (!transactions.length) {
        throw new Error('No transactions found for this user');
    }

    return transactions;
};

exports.getTranssactionDetails = async (userId, transactionId) => {
    const stmt = db.prepare(`
            SELECT id, user_id, amount, type, category, description, date
            FROM transactions
            WHERE id = ?
            ORDER BY date DESC
        `);

    const transaction = stmt.get(transactionId);

    if (!transaction) {
        throw new Error('Transaction does not exists');
    } else if (transaction.user_id !== userId) {
        throw new Error('You are not authorized to access this transaction');
    }

    return transaction;
}

exports.getBalance = async (userId) => {
    const stmt = db.prepare('SELECT balance FROM users WHERE id = ?');
    const user = stmt.get(userId);

    if (!user) {
        throw new Error('User not found');
    }

    return user.balance;
};
