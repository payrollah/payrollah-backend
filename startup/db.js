const config = require('../config/keys');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.dbEndpoint, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;

/**
 *
 * Initialize database connection
 *
 */

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection was successfully established.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database. ' + err);
    });

db.Company = require('../models/Company');
db.Employee = require('../models/Employee');

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

/**
 *
 * Database Seeder
 *
 */

 db.sequelize.sync({ force: true }).then(() => {
     console.log("DB has been synced")
 })


// const data = require('../test_data');
// db.sequelize.sync({ force: true }).then(() => {
//     db.Company.bulkCreate(data.companies).then((company) => {
//         console.log(company)
//     });
// }).then(() => {
//     console.log("DB has been synced")
// });