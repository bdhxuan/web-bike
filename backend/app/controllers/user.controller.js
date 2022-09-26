const ApiError = require("../middleware/api-error");
const catchAsyncError = require("../middleware/catchAsyncError");
const { validate } = require("../models/user.model");
const User = require("../models/user.model");
const sendToken = require("../utils/jwtToken.until");
const sendEmail = require("../utils/sendEmail.until");
const crypto = require("crypto");

//dang ky tai khoan
exports.registerUser = catchAsyncError(async(req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "Đây là vd id",
            url: "profilepicUrl"
        },
    });

    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     token, 
    // });        
     sendToken(user, 201, res);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
});

//dang nhap
exports.loginUser = catchAsyncError(async(req, res, next) => {
    const {email, password} = req.body;
    //kiem tra user co cung cap email va password chua
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

    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     token, 
    // });       
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

//quen mat khau
exports.forgotPassword = catchAsyncError(async(req, res, next)=> {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ApiError(404, "User không tồn tại!"));
    }

    //lay ma dat lai mat khau
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false });

    const resetPasswordUrl =  `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Mã đặt lại mật khẩu của bạn là:- \n\n ${resetPasswordUrl} \n\n Nếu bạn không yêu cầu email này vui lòng bỏ qua!`;

    try{

        await sendEmail({
            email: user.email,
            subject: `Password Recovery From WebBike`,
            message, 
        });

        res.status(200).json({
            success: true,
            message: `Email gửi đến ${user.email} thành công!`
        })
    }catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ApiError(500, error.message));
    }
});

//dat lai mat khau
exports.resetPassword = catchAsyncError(async (req, res, next)=> {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now() },
    });
    if(!user) {
        return next(new ApiError(400, "Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn!"));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ApiError(400, "Mật khẩu không trùng khớp"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
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
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    //them vao cloudinary
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        userFindAndModify: false,
    });
    
    res.status(200).json({
        success: true
    });
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
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    //them vao cloudinary

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        userFindAndModify: false,
    });
    
    res.status(200).json({
        success: true
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