const mongoose = require("mongoose")
class Mongoose {
    static connect = async (uri) => {
        if (this.client) return this.client;
        this.client = await mongoose.connect(uri);
        return this.client;
    };
}
module.exports = Mongoose;