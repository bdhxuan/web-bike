const express = require("express");
const cors = require("cors");
const ApiError = require("./app/middleware/api-error");
const product = require("./app/routes/product.route");
const user = require("./app/routes/user.route");
const order = require("./app/routes/order.route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api/v1", product);

app.use("/api/v1", user);

app.use("/api/v1", order);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Lỗi sai Id Mongoose
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ApiError(404, message);
    }

    //Lỗi trùng lặp Mongoose
    if(err.code == 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ApiError(404, message);
    }

    //Lỗi JWT sai
   if(err.name === "JsonWebTokenError") {
        const message = `Json Web Tokken is invalid, Try again `;
        err = new ApiError(404, message);
    }

     //Lỗi JWT hết hạn
   if(err.name === "TokenExpiredError") {
        const message = `Json Web Tokken is Expired, Try again `;
        err = new ApiError(404, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
});

module.exports = app;