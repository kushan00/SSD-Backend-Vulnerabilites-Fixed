const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'app.log'); 

// Create a logger with a custom format
const logger = winston.createLogger({
  level: 'debug', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: logFilePath  }), // Log errors to a file
  ]
});

module.exports = logger;