const mysql = require('mysql2/promise');
const fs = require('fs'); // Required to read files
const path = require('path'); // Required to build file paths reliably
require('dotenv').config();

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
    // This looks for 'ca.pem' in the same directory as this file
    ca: fs.readFileSync(path.join(__dirname, 'ca.pem')),
  }
});

pool.getConnection()
  .then(connection => {
    console.log('MySQL Database connected successfully!');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to MySQL Database:', error.message);
  });

module.exports = pool;