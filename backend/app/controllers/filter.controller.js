const ApiError = require("../middleware/api-error");
const Product = require("../models/product.model");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/api-feature");

exports.getNewArrivals = catchAsyncError(async (req, res) => {
   
	const newArrivals = await Product.find({}).sort({createdAt: -1 }).limit(5)
		
	res.status(200).json({
		success: true,
		newArrivals,
	});
		
});

exports.getFilterPriceAsc = catchAsyncError(async (req, res) => {
	const FilterPriceAscs = await Product.find({}).sort({price: 1})
	res.status(200).json({
		success: true,
		FilterPriceAscs,
	});
})


exports.getFilterPriceDesc = catchAsyncError(async (req, res) => {
	const FilterPriceDescs = await Product.find({}).sort({price: -1})
		
	res.status(200).json({
		success: true,
		FilterPriceDescs,
	});
})
