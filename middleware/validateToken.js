const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = (req, res, next) => {
    const token = req?.header('Authorization')?.match(/^Bearer\s(.+)$/)?.[1];
    console.log("TOKEN",token);
    if (!token) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        jwt.verify(token, config.jwt_secret,(err,decoded)=>{
            if(err)
            {
                console.log(err);
                return res.status(403).json({ message: 'Token Error' });   
            }
            req.user = decoded.user;
            next();
        });
    } catch (err) {
        console.log("ERROR",err);
        res.status(401).json({ message: 'Invalid token' });
    }

}

module.exports = {verifyToken};