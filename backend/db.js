const { Pool } = require("pg");

// establish a pool connection to the database
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_3mmt',
    password: 'gentle',
});

// test the connection
db.connect()
    .then(() => {
        console.log('Connected to the database');
        // Create table if it doesn't exist.  Good practice to ensure schema is set up.
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;
        return db.query(createTableQuery);
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });


// export the database connection and createTable function
module.exports = {
    db
};