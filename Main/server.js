// Require necessary modules
const express = require('express');
const { Pool } = require('pg');

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "tracker_db",
    password: "Password",
    port: 5432,
});

// Connect to the database
pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Define routes
app.get('/', (req, res) => {
    res.send('Employee Tracker API');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







