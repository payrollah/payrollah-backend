const { DataTypes, Sequelize } = require('sequelize');
const db = require('../startup/db');
const bcrypt = require('bcryptjs');

const Company = db.sequelize.define(
    'Company', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        companyAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(password) {
                this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
            },
        },
    }, {
        underscored: true,
        freezetableName: true,
        tableName: 'companies',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Company;