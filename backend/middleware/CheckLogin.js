const jwt = require('jsonwebtoken')
const Login = (req, res , next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token , 'supersecret');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(404).json("Cannot access");
    }
}
module.exports = {Login}