const mongoose = require('mongoose')

const gymSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    },
})

//generating tokens

// now we need to create a collections
const Register = new mongoose.model("Register", gymSchema);
module.exports = Register;