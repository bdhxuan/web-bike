const ApiError = require("../middleware/api-error");
const catchAsyncError = require("../middleware/catchAsyncError");
const { validate } = require("../models/user.model");
const User = require("../models/user.model");
const sendToken = require("../utils/jwtToken.until");
const crypto = require("crypto");


//dang ky tai khoan
exports.registerUser = catchAsyncError(async(req, res, next) => {
   
    const {username, email, password} = req.body;
    const user = await User.create({
        username, email, password,
        
    });
 
     sendToken(user, 201, res);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
});

//dang nhap
exports.loginUser = catchAsyncError(async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new ApiError(400, "Nhập email và mật khẩu!"));
    }

    const user = await User.findOne({email }).select("+password");
    if(!user){
        return next(new ApiError(401, "Email hoặc mật khẩu không hợp lệ!"));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ApiError(401, "Email hoặc mật khẩu không hợp lệ!"));
    }

    sendToken(user, 200, res);       
});

//dang xuat
exports.logout = catchAsyncError(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Đăng xuất thành công!",
    });
});


//lay thong tin chi tiet nguoi dung
exports.getUserDetails = catchAsyncError(async(req, res, next)=> {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        user,
    });
});

//cap nhat password user
exports.updatePassword = catchAsyncError(async(req, res, next)=> {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ApiError(400, "Mật khẩu cũ không đúng!"));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ApiError(400, "Mật khẩu không trùng khớp!"));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

});

//cap nhat ho so user
exports.updateProfile = catchAsyncError(async(req, res, next)=> {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ApiError(400, "Mật khẩu cũ không đúng!"));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ApiError(400, "Mật khẩu không trùng khớp!"));
    }

    user.password = req.body.newPassword;
    user.username = req.body.username;
    user.email = req.body.email;

    await user.save();

    sendToken(user, 200, res);
});

//lay tat ca user -- admin
exports.getAllUser = catchAsyncError(async(req, res, next)=> {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

//lay mot user -- admin
exports.getSingleUser = catchAsyncError(async(req, res, next)=> {
    const user = await User.findById(req.params.id);
    
    if(!user) {
        return next(new ApiError(`Không tồn tại người dùng với Id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

//cap nhat vai tro user -- admin
exports.updateUserRole = catchAsyncError(async(req, res, next)=> {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    }
    
    res.status(200).json({
        success: true,
        message: "Cập nhật hồ sơ thành công!"
    });
});

//xoa user -- admin
exports.deleteUser = catchAsyncError(async(req, res, next)=> {
    const user = await User.findById(req.params.id);

    //xoa khoi cloudinary
    if(!user){
        return next(new ApiError(404,`Không tồn tại người dùng với Id: ${req.params.id}`));
    }

    await user.remove();
    
    res.status(200).json({
        success: true,
        message: "Xóa người dùng thành công !"
    });
});