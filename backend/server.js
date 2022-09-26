const app = require("./app");
const config = require("./app/config");
const Mongoose = require("./app/utils/mongoose.util");
const dotenv = require("dotenv");

//Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit();
});

dotenv.config({path:"backend/app/config/index.js"});

async function startServer() {
    try {
        await Mongoose.connect(config.db.uri, {useNewURLParser: true, useUnifiedTopology: true, useCreateIndex: true}).then((data) => {
            console.log("Connected to the database!");
        });
        const PORT = config.app.port;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }catch (error){
        console.log("Cannot connected to the database!", error);
        process.exit();
    }
}

//Unhandled Promise Rejection
process.on("unhandledRejection", err=> {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() =>{
        process.exit();
    });
});

startServer();