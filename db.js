const mongoose = require('mongoose');
const config = require('./config')

const dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;

let isConnected = false;
const connectDB = async () => {
    if (isConnected) {
        console.log("Reusing existing MongoDB connection.");
        return mongoose.connection;
    }

    try {
        await mongoose.connect(dbUrl, {
            maxPoolSize: config.maxPoolSize,
            minPoolSize: config.minPoolSize,
            serverSelectionTimeoutMS: config.serverSelectionTimeoutMS,
        });

        isConnected = true;
        console.log("Connected to MongoDB with connection pooling.");
        return mongoose.connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

const closeDB = async () => {
    if (isConnected) {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        isConnected = false;
    }
};

module.exports = { connectDB, closeDB };
