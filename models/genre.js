const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
        minlength : 5,
        maxlength : 50
    }
});
const Genre = mongoose.model('Genres',genreSchema);

function valitedateGenre(genre){
    const schema = {
        name : Joi.string().required().required().min(5).max(50)
    }
    return Joi.validate(genre,schema);
}


module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = valitedateGenre;

