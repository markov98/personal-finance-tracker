const Database = require('better-sqlite3');
const { DBPATH } = require('../constants');

const initializeDatabase = () => {
    let db;
    try {
        db = new Database(DBPATH);

        // Create users table
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                balance REAL NOT NULL
            )
        `);

        // Create transactions table
        db.exec(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                amount REAL NOT NULL,
                type TEXT NOT NULL,
                category TEXT,
                description TEXT,
                date TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log('Connected to database.');
    } catch (error) {
        console.error('Failed to initialize the database:', error.message);
        if (db) {
            db.close();
            console.log('Database connection closed due to error.');
        }
        process.exit(1);
    }

    process.on('SIGINT', () => {
        db.close();
        console.log('Database connection closed.');
        process.exit(0);
    });

    return db;
};

module.exports = initializeDatabase();