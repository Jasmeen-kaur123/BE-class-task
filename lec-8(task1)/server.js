const { log } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Define log file path
const logFilePath = path.join(__dirname, 'requests.log');

// Middleware to log request details
app.use((req, res, next) => {
    console.log("Middleware 1");
    console.log(req.url);
    console.log(req.method);
    console.log(req.protocol);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(new Date());

    // Construct the log message
    const logMessage = JSON.stringify({
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method,
        protocol: req.protocol,
        hostname: req.hostname,
        ip: req.ip,
    }) + '\n';

    // Append log to file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    next(); // Pass control to the next middleware
});

// Sample routes
app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
