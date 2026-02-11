const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const signToken = (user) => {
    const token = jwt.sign(user, secret);
    return token;
};

const verifyToken = (token) => {
    const user = jwt.verify(token, secret);
    return user;
};

module.exports = { signToken, verifyToken };
