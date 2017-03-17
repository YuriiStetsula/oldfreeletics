var express = require ("express");
var router  = express.Router();
var Cardioguide   = require ("../models/strength.js");

router.get("/",function(req,res){
    Cardioguide.find({},function(err,guide){
        if(err){
            console.log(err)
        }else {
            res.render("cardio/index",{guide : guide})
        }
    })

});

module.exports = router;