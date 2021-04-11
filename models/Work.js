const { DataTypes } = require('sequelize');
const db = require('../startup/db');

const Work = db.sequelize.define(
    'Work', {
        uuid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        urlLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        underscored: true,
        freezetableName: true,
        tableName: 'work',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Work;