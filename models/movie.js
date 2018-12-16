const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genreSchema = require('./genre');

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        minlength : 5,
        maxlength : 255
    },
    genre : {
        type : genreSchema,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    dailyRentalRate:{
        type : Number,
        required:true,
        min :0,
        max:255
    }
});


const Movie = mongoose.model('Movies',movieSchema);

function validateMovie(movie){
    const schema = {
        title : Joi.string().required().min(5).max(255),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().min(0).required().max(255),
        dailyRentalRate : Joi.number().required().min(0).max(255)
    };

    return Joi.validate(movie,schema);
}

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;

module.exports.validate = validateMovie;
