const ApiError = require("./api-error");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const User = require("../models/user.model");

exports.isAuthenticatedUser = catchAsyncError(async(req, res, next) => {
    const {token} = req.cookies;
    
    if(!token){
        return next(new ApiError(401, "Vui lòng đăng nhập để truy cập!"));
    }

    const decodeData = jwt.verify(token, config.JWTS.secret);

    req.user = await User.findById(decodeData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
          return next( new ApiError(403, `Vai trò: ${req.user.role} không cho phép truy cập vào trang này!`));
        }
        next();
    };
};