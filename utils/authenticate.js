
const jwt = require('jsonwebtoken');

function verifyToken (req, reply, done) {

    const  bearerHeader  = req.headers.authorization
    const token = bearerHeader.replace('Bearer ', '')

    jwt.verify(token, this.config.JWT_SECRET, (err, decoded) => {
        if (err) {
            done(new Error('Unauthorized'))
        }

        req.user = {
            id: decoded.id,
        }
    })

    done()
}

module.exports = verifyToken