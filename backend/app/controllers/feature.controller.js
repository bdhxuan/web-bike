const ApiError = require("../middleware/api-error");
const Product = require("../models/product.model");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.getFeatureProducts = catchAsyncError(async (req, res) => {
   
	const FeatureProducts = await Product.find({}).limit(10)
		
	res.status(200).json({
		success: true,
		FeatureProducts,
	});
		
});