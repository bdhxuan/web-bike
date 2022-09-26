const { ObjectId } = require("mongoose");
class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }
}

module.exports = ProductService;