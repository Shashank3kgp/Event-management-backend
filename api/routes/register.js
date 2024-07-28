const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://joanhkonvhstqilmvolt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYW5oa29udmhzdHFpbG12b2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNzUyNjYsImV4cCI6MjAzNzY1MTI2Nn0.l01_XrmJIgQw-q6PHI7QQ6vnAjrfTx2RwANU7zoFDkE'
const supabase = createClient(supabaseUrl, supabaseKey)
const express = require('express');
const router = express.Router();
const user = require('../models/user');
const mongoose = require('mongoose');

router.post('/',async (req,res,next)=>{
    try{
    const email = req.body.email;
    const password = req.body.password;
    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
      })
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userId: mongoose.Types.ObjectId
      })
      await newUser.save();
      res.status(200).json({
        message: "successfully registered",
        user:user
      })
    }catch(err){
        res.status(400).json({
            message:"error",
            error:err
        })
    }
})

module.exports = router;