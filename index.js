const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Controller
const home_controller = require('./controllers/home.controller');
const movie_controller = require('./controllers/movie.controller');
const rental_controller = require('./controllers/rental.controller');
const user_controller = require('./controllers/user.controller');


//Setup 

app.use(express.urlencoded({
    extended : true
}));
app.use(express.static('public'));
app.use(helmet());


//Set export NODE_ENV=production
if(app.get('env') === 'development'){
    //console.log('use morgan');
    app.use(morgan('dev'));
}

process.setMaxListeners(Infinity); // <== Important line

//Connect Mongoose
mongoose.connect('mongodb://localhost:27017/test',
    { 
        useNewUrlParser: true,
        useFindAndModify : false,
        useCreateIndex : true
    })
    .then(()=>{
        console.log('Mongoose Connection.....');     
    })
    .catch(err =>{
        console.log('Mongoose connection failed...'+err);
    });


//Router
app.use(express.json());
app.get('/',home_controller);
app.use('/api/movies',movie_controller);
app.use('/api/rentals',rental_controller);
app.use('/api/users',user_controller);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
     console.log(`Server start at port : ${port}`);
});