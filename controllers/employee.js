// Employee is deprecated

const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/keys");
const web3 = require("../services/web3Client")();

let refreshTokens = [];

module.exports = () => {
    var methods = {};

    methods.create = (req, res) => {
        const userData = {
            address: req.body.address,
            name: req.body.name,
            nric: req.body.nric,
            email: req.body.email,
            password: req.body.password,
        };
        methods.findByEmail(req.body.email).then((userFound) => {
            if (!userFound) {
                Employee.create(userData)
                    .then(() => {
                        res.status(200).send({ success: true })
                    })
                    .catch((err) => {
                        res.status(400).send(err);
                    });
            } else {
                res.status(400).send('Email already exist');
            }
        });
    };

    methods.findByEmail = (email) => {
        return Employee.findOne({
            where: {
                email: email,
            },
        });
    };

    methods.findByUuid = (uuid) => {
        return Employee.findOne({
            where: {
                uuid: uuid,
            },
        });
    };

    methods.findByAddress = (address) => {
        return Employee.findOne({
            where: {
                address: address,
            },
        });
    };

    methods.login = (req, res) => {
        const hashedPw = req.body.password;
        methods.findByEmail(req.body.email).then((user) => {
            if (user) {
                if (bcrypt.compareSync(hashedPw, user.dataValues.password)) {
                    const accessToken = generateAccessToken(user.dataValues)
                    const refreshToken = jwt.sign(user.dataValues, config.REFRESH_TOKEN_SECRET);
                    refreshTokens.push(refreshToken);
                    res.json({
                        accessToken,
                        refreshToken
                    });
                } else {
                    res.status(401).send('Wrong password');
                }
            } else {
                res.status(400).send('Employee does not exist.');
            }
        });
    };

    methods.refreshToken = (req, res) => {
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(401)
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
        jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const {iat, ...userData} = user;
            const accessToken = generateAccessToken(userData)
            res.json({ accessToken: accessToken })
        });
    };

    methods.logout = (req, res) => {
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.sendStatus(204)
    };

    methods.getEmployee = (req, res) => {
        const companyId = req.user.companyId;
        const employeeAddress = req.query.address;
        web3.isEmployeeAddressOfCompany(employeeAddress, companyId).then((isEmployee) => {
            if (isEmployee) {
                methods.findByAddress(employeeAddress).then((employee) => {
                    if(employee){
                        res.json({
                            ...employee.dataValues
                        })
                    }
                });
            } else{
                res.status(400).send({reason:"Employee does not exist"});
            }
        }).catch((err)=>{
            res.status(400).send(err);
        });
    }

    return methods
}

function generateAccessToken(user) {
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
}