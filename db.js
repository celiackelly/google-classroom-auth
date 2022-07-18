const mongoose = require('mongoose')

const DB_CONNECTION_STR = process.env.MONGO_DB_CONNECTION_STR

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(DB_CONNECTION_STR)
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB