// in config/db.js

const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true
  }
});

// This connection test is for logging purposes only
pool.getConnection()
  .then(connection => {
    console.log('MySQL Database connected successfully!');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to MySQL Database:', error.message);
  });

// **CRITICAL FIX:** Make sure you export the pool at the end.
module.exports = pool;