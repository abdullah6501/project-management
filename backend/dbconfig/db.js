const mysql = require('mysql');
const log4js = require('log4js');

const logger = log4js.getLogger('db');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'project_portfolio'
});

connection.connect((err) => {
  if (err) {
    logger.error('Error connecting to MySQL:', err);
    throw err;
  }
  logger.info('Connected to MySQL database');
  console.log("Connected to the database");
});

connection.on('error', (err) => {
  logger.error('MySQL connection error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    logger.info('Attempting to reconnect to MySQL...');
    connection.connect();
  } else {
    throw err;
  }
});

module.exports = connection;
