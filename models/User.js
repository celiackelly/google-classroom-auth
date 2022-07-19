const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
    email: {
        type: String, 
        unique: true,
        required: true,
    }, 
    password: {
        type: String, 
        minLength: 8, 
        required: true
    }, 
    courses: {
        type: Array,
        default: [], 
        required: true,
    }
})

//use the schema to create a model 
const User = Mongoose.model('user', UserSchema)

module.exports = User