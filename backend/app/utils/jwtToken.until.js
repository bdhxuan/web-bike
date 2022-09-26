const config = require("../config/index");

//tao token va gui cookie
const sendToken = (user, statusCode, res) =>{
    const token = user.getJWTToken();

    //lua chon cho cookie
    const options = {
        expires: new Date (
            Date.now() + config.cookie.ck_exprise * 24 *60*60*1000 //24 ngay, 60 gio, 60 phut, 1s = 1000 ms // vi ngay het han cua cookie tinh bang miliseconds
        ),
        httpOnly: true,
    };     

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;