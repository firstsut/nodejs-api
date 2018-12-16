const {Rental,validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const Fawn = require('fawn');
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

//Use transaction
Fawn.init(mongoose);

//List
router.get('/',async (req,res)=>{
    const rentals = await Rental.find().sort('_id');
    res.send(rentals);
});


//Save
router.post('/',async (req,res)=>{

    try{

       
        const {err} =  await validate(req.body);
        if(err) return res.status(400).send(err.details);

        const customer = await Customer.findById(req.body.customerId);
        if(!customer) return res.status(400).send('Invaid cutomerId');
       
        const movie = await Movie.findById(req.body.movieId);
        if(!movie) return res.status(400).send('Invalid movieId');

        if(movie.numberInstock === 0) return res.status(400).send('Movie out of stock');

        let rental = new Rental({
            customer : customer,
            movie : movie,

        });

        try{

            Fawn.Task()
                .save('rentals',rental)
                .update('movies',{
                    _id : movie._id
                },{
                    $inc : { numberInStock : -1} 
                }).run();
            
        
            res.send(rental);
        }catch(err){
            return res.status(500).send(err);
        }
       

    }catch(err){
        return res.status(400).send(err);
    }
   
});

//Update
router.put('/:id',async (req,res)=>{
    try{
        await Rental.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },
        {
            new : true
        })
        .then(rental=>{
            if(rental == null) return res.status(400).send('Invalid id');
            return res.send(rental);
        });  
    
    }catch(err){
        return res.status(400).send(err.message);  
    }
   
});


//Delete
router.delete('/:id',async (req,res)=>{
    const response = {
        status : true,
        msg : ''
    };
    try{
        await Rental.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(data == null){
                response.status = false;
                response.msg = 'Invalid id';
                return res.status(400).send(response) 
            }
            return  res.send(response)        
        });
    }catch(err){
        response.status = false;
        response.msg = err;
        return res.status(400).send(response) 
    }

});

module.exports = router;