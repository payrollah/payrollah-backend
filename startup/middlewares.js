const http = require('http');
const cors = require('cors');
const express = require('express');

module.exports = function(app) {

    app.use(cors());
    app.use(express.json());

    const server = http.createServer(app);
    server.keepAliveTimeout = 65000;
}