const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/keys");

let refreshTokens = [];

module.exports = () => {
    var methods = {};

    methods.create = (req, res) => {
        const userData = {
            companyId: req.body.companyId,
            email: req.body.email,
            password: req.body.password,
        };

        methods.findByEmail(req.body.email).then((userFound) => {
            if (!userFound) {
                Company.create(userData)
                    .then(() => {
                        res.status(200).send({ success: true })
                    })
                    .catch((err) => {
                        res.status(400).send(err);
                    });
            } else {
                res.status(400).send('Email already Exist');
            }
        });
    };

    methods.findByEmail = (email) => {
        return Company.findOne({
            where: {
                email: email,
            },
        });
    };

    methods.findByUuid = (uuid) => {
        return Company.findOne({
            where: {
                uuid: uuid,
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
                res.status(400).send('Company does not exist.');
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

    return methods
}

function generateAccessToken(user) {
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
}