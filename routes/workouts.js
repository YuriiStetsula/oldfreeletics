var express = require ("express");
var router  = express.Router();
var Workout   = require ("../models/workouts.js");

router.get("/",function(req,res){

    Workout.find({},function(err,allWorkouts){
        if(err){
            console.log(err)
        }else{
            res.render("workouts/index",{allWorkouts : allWorkouts})
        }
    })
})

router.get("/:id",function(req,res){
    res.render("workouts/index")
})

module.exports = router;