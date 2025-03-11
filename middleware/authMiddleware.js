// this file contains all the middlewares that can be put at all routes that need this middleware.
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                return res.status(400).json({message: "token didn't match"});
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        return res.status(400).json({message: 'error'});
    }
}

// export function
module.exports = {requireAuth};