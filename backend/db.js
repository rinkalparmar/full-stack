const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/crud";

const connecton = async () => {
    await mongoose.connect(connectionString);
    console.log("connection successfully");
};

module.exports = connecton


