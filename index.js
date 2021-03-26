const dotenv = require('dotenv').config();

const express = require('express');
const config = require('./config/keys');

const app = express();

// Start Postgres
require('./startup/db');

// Middleware Configurations
require('./startup/middlewares')(app);

// Express route handlers
require('./startup/routes')(app);

const PORT = config.port;
const server = app.listen(PORT, () => console.log(`Savy Backend listening on port ${PORT}...`));