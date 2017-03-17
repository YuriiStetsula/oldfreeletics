var express = require ("express");
var router  = express.Router();
var Exercise   = require ("../models/exercises.js");


router.get("/", function(req,res){
    Exercise.find({},function(err,exercise){
        if(err){
            console.log(err)
        }else{
            res.render("exercises/index",{exercise:exercise})
        }
    })

});

router.get("/:id", function(req,res){
    res.render("exercises/index")
})

module.exports  = router
