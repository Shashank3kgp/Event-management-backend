const express = require('express');
const router = express.Router();
const session = require('../models/session');


router.get('/',(req,res,next)=>{
    try{
    const Id = req.body.user_id;
    session.findById(Id).exec()
    .then(result=>{
        res.status(200).json({
            count: result.length,
            sessions: result.map(res=>{
                return{
                    user_id: req.body.user_id,
                    loginTime: req.body.loginTime,
                    logOutTime: req.body.logoutTime,
                    IpAddress: req.body.IpAddress
                }
            })
        })
    })
    .catch((err)=>{
        res.status(400).json({
            error: err,
            message: "not found"
        })
    }
    )
    }catch(err){
        res.status(400).json({
            error: err,
            message : "error"
        })
    }
})

module.exports = router;