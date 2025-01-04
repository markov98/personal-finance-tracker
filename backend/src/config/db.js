const Database = require('better-sqlite3');
const { DBPATH } = require('../constants');

const initializeDatabase = () => {
    let db;
    try {
        db = new Database(DBPATH);

        // Create tables if they do not exist
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
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

module.exports = initializeDatabase;
