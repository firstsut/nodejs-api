const {Movie,validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();


router.get('/',async (req,res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
}); 

router.get('/:id',(req,res)=>{
    
}); 

router.post('/',async (req,res)=>{
    try {
        const {err} = await validate(req.body);
        if(err) return res.status(400).send(err.details);

        const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(400).send('Invalid genreId');

        let movie = new Movie({
            title : req.body.title,
            genre : {
                _id  : genre._id,
                name : genre.name
            },
            numberInStock : req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate
        });

        movie = await movie.save();
        res.send(movie);
    } catch (error) {
        return res.status(400).send(error);
    }

}); 

router.put('/:id',(req,res)=>{

    
}); 

router.delete('/:id',(req,res)=>{
    
}); 

module.exports = router;