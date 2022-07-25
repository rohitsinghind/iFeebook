const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required: [true, "please enter a name"]
    },
    email:{
        type:String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"]
    },
    password:{
        type:String,
        required: [true, "please enter a password"],
        minlength: [5, "Password must be at least 5 characters"],
    }
})

module.exports = mongoose.model("user", UserSchema);
