const mongooe = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {customerSchema} = require('./customer');
const {movieSchema} = require('./movie');

const rentalSchema = new mongooe.Schema({
    customer : {
        type : customerSchema,
        required : true
    },
    movie : {
        type : movieSchema,
        required : true
    },
    dateOut : {
        type : Date,
        required : true,
        default : Date.now
    },
    dateReturned : {
        type : Date
    },
    rentalFee : {
        type : Number,
        min : 0
    }
});

const Rental = mongooe.model('Rentals',rentalSchema);

function validateRental(rental){
    const schema = {
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
    };
    return Joi.validate(rental,schema);
}

module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;
module.exports.validate = validateRental;

