const mongoose = require("mongoose");
const config = require("../config/index");
const validator = require("validator");
const bcrypt = require("bcryptjs"); //thu vien bam mat khau
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Nhập tên"],
        maxLength:[30, "Tên không thể vượt quá 30 ký tự!"],
        minLength:[4, "Tên nên có lớn hơn 4 ký tự!"],
    },
    email: {
        type: String,
        required: [true, "Nhập email"],
        unique: true,
        validate: [validator.isEmail, "Vui lòng nhập email hợp lệ!"],
    },
    password: {
        type: String,
        required: [true, "Nhập mật khẩu"],
        minLength: [8, "Mật khẩu nên lớn hơn 8 ký tự!"],
        select: true,
    },
    role: {
        type: String,
        default: "thành viên",
    },

});

//bam mat khau truoc khi luu
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
});

//JWT Token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id}, config.JWTS.secret , {
        expiresIn: config.JWTS.expire,
    });
};

//so sanh mat khau
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);