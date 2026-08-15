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

// const mysql = require('mysql2/promise');

// // Local XAMPP MySQL database connection setup
// const dbPoolGridConnection = mysql.createPool({
//   host: process.env.DB_HOST || '127.0.0.1',       // Localhost loopback IP
//   port: process.env.DB_PORT || 3306,              // XAMPP MySQL default port
//   user: process.env.DB_USER || 'root',            // XAMPP default user
//   password: process.env.DB_PASSWORD || '',        // XAMPP default గా empty password ఉంటుంది
//   database: process.env.DB_NAME || 'defaultdb',   // మీ Local Database పేరు ఇక్కడ ఇవ్వండి
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
  
//   // Local environment లో SSL validation అవసరం లేదు కాబట్టి ssl configuration ని తీసేశాము
// });

// module.exports = dbPoolGridConnection;
