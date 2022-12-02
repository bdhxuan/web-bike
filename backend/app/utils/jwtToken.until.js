const config = require("../config/index");

//tao token
const sendToken = (user, statusCode, res) =>{
    const token = user.getJWTToken();
    res.status(statusCode).cookie('token', token).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;