module.exports = function(app) {
    app.use('/', require('../routers/rootRoutes'));
    app.use('/company', require('../routers/companyRoutes.js'));
};