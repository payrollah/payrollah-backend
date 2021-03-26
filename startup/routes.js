module.exports = function(app) {
    app.use('/api', require('../routers/rootRoutes'));
    app.use('/api/auth', require('../routers/authRoutes.js'));
};