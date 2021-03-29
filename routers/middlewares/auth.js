const config = require('../../config/keys');
const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if (authHeader == null || !authHeader.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authHeader.slice(7, authHeader.length);

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}