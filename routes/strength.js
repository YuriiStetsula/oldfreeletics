var express = require ("express");
var router  = express.Router();
var Strengthguide   = require ("../models/strength.js");

router.get("/",function(req,res){
    Strengthguide.find({},function(err,guide){
        if(err){
            console.log(err)
        }else {
            res.render("strength/index",{guide : guide})
        }
    })

})

module.exports  = router;