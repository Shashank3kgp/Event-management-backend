const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const registerRouter = require('./api/routes/register');
const loginRouter = require('./api/routes/login');
const eventRouter = require('./api/routes/event');
const sessionRouter = require('./api/routes/session');
const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://shashanktupakula:<password>@cluster0.hzhdddq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/register',registerRouter);
app.use('/login', loginRouter);
app.use('/events',eventRouter);
app.use('/sessions', sessionRouter);
// app.use('/weather', weatherRouter);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 400;
    next(Error); 
})

app.use((error,req,res,next)=>{
    res.status(400).json({
        error: error,
    });
})

module.exports = app;