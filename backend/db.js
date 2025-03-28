const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/crud";

const connecton = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("connection successfully");
    } catch (error) {
        console.log("not set connection");
    }
};

module.exports = connecton


