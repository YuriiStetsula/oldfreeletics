var express = require ("express");
var router  = express.Router();
var CardioAndStrengthguide   = require ("../models/strength.js");


router.get("/",function(req,res){
    CardioAndStrengthguide.find({},function(err,guide){
        if(err){
            console.log(err)
        }else {
            res.render("cardioandstrength/index",{guide : guide})

        }
    })

});

module.exports = router;