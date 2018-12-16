const express = require('express');
const router = express.Router();
const {User,validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');

//List
router.get('/',async (req,res)=>{
    const users = await User.find().sort('_id');
    res.send(users);
});

//Save
router.post('/',async (req,res)=>{

    try{
        const {err} = await validate(req.body);
        if(err) return res.status(400).send(err.details);
    
        let user = await User.findOne({email : req.body.email});
        if(user) return res.status(400).send('User already registered');
    
        user = new User(_.pick(req.body,['email','name','password']));
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password,salt);
        await user.save();
        res.send(_.pick(user,['email','_id','name']));

    }catch(err){
        return res.status(400).send(err);
    }
   
});

module.exports = router;