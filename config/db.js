const mysql = require('mysql2/promise');

// Live Cloud MySQL database connection setups using Environment Variables
const dbPoolGridConnection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 26713,
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  // Cloud database handshake encryption bypass
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = dbPoolGridConnection;