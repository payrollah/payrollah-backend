const { DataTypes, Sequelize } = require('sequelize');
const db = require('../startup/db');
const bcrypt = require('bcryptjs');

const User = db.sequelize.define(
    'User', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
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
        tableName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = User;