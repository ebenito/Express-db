const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'Debe de introducir un email'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role:{
        type:String,
        default:'user',
        enum:['admin','user','guest']
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
