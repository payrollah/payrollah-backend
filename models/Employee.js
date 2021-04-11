// Employee is deprecated

const { DataTypes, Sequelize } = require('sequelize');
const db = require('../startup/db');
const bcrypt = require('bcryptjs');

const Employee = db.sequelize.define(
    'Employee', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nric: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(password) {
                this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
            },
        }
    }, {
        underscored: true,
        freezetableName: true,
        tableName: 'employees',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Employee;