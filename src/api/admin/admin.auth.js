const jwt = require('jsonwebtoken');

const SECRET = 'adfcvgt';

exports.verifyToken = (req, res, next) => {
    const auth = req.auth;
    console.log(auth)
    if (auth.scheme !== 'Bearer') {
        return res.send('Invalid scheme provided');
    }
    jwt.verify(auth.token, SECRET, (error, data) => {
        if (error) {
            return res.send('Invalid Token');
        }
        req.auth.user = data.admin;
        next()
    });
}

exports.jetToken = (admin, cb) => {
    jwt.sign({admin }, SECRET, { expiresIn: '3000s' }, cb);
};

exports.extractToken = (req, res, next) => {
    const bearer = req.headers["authorization"]; // Bearer jhskjdhkjshbkvsfv
    const auth = bearer.split(" ");
    req.auth = {
        scheme: auth[0],
        token: auth[1],
    };
    if (!req.auth.token) {
        res.send("access dennied")
    } else {
        next();
    }
}
   