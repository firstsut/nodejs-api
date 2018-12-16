const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 5,
        maxlength : 50,
        required:true
    },
    email : {
        type : String,
        minlength : 10,
        maxlength : 255,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minlength : 5,
        maxlength : 1024,
        required : true
    }      
});

const User = mongoose.model('Users',userSchema);

function validateUser(user){
    const schema = {
        name : Joi.string().required().min(5).max(50),
        email : Joi.string().required().min(10).email().max(255),
        password : Joi.string().required().min(5).max(1024)
    };
    return Joi.validate(user,schema);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validate = validateUser;
