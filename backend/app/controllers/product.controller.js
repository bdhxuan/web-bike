const ApiError = require("../middleware/api-error");
const Product = require("../models/product.model");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/api-feature");


exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;

    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage); //phan trang
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
    })
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
     res.status(200).json({
        success: true,
        product,
        productCount,
    })
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = Product.findById(req.params.id);
    if(!product) {
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công!"
    })
});

//tao danh gia moi hoac cap nhat danh gia
exports.createProductReview = catchAsyncError(async (req, res, next)=> {
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if( rev.user.toString() === req.user._id.toString())
                (rev.rating = rating),
                (rev.comment = comment);
        })
    }else {
        product.reviews.push(review);
        product.numofReviews = product.reviews.length
    }

    // 4,5,5,2 = 16, 16/4=4
    let avg = 0;
    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating;
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

//lay tat ca reviews cua san pham
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//xoa review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }

    const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString());  

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;
    if(reviews.length == 0) {
        ratings=0;
    } else{
        ratings = avg / reviews.length;
    }
     
    const numofReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, 
        {
            reviews,
            ratings,
            numofReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        },
    );
    res.status(200).json({
        success: true,
        message: "Xóa đánh giá thành công!"
    });
});