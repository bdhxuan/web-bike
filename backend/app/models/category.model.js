const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
        category: {
            type: String,
            required: [true, "Nhập danh mục sản phẩm"],
            trim: true,
            maxlength: 50,
        },
        createAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model("Category", categorySchema);