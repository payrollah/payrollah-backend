module.exports = function(app) {
    app.use('/', require('../routers/rootRoutes'));
    app.use('/company', require('../routers/companyRoutes.js'));
    app.use('/work', require('../routers/workRoutes.js'));
    // app.use('/employee', require('../routers/employeeRoutes.js')); // Employee is deprecated
};