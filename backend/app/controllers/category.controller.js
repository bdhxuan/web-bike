const Category = require('../models/category.model');
const ApiError = require("../middleware/api-error");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.createCategory = catchAsyncError(async(req, res, next) => {
    const { category } = req.body;
    const newCategory = await Category.create({
        category
    })
    res.status(201).json({
        success: true,
        newCategory,
    });
});


exports.getAllCategory = catchAsyncError( async(req, res, next) => {
    const categories = await Category.find({});
    res.status(201).json({
        categories,
    });
})


exports.deleteCategory = catchAsyncError(async(req, res, next)=> {
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new ApiError(404,"Danh mục không tồn tại!"));
    }

    await category.remove();
    res.status(200).json({
        success: true,
        message: "Xóa danh mục thành công!"
    })
})