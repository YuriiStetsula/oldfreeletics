/**
 * Created by admin on 07.03.2017.
 */
var express     = require ("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express()


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine","ejs")

mongoose.connect(process.env.DATABASEURL);
console.log(process.env.DATABASEURL);

// var guideSchema  = new mongoose.Schema({
//     name : String,
//     week : [
//         {
//             session : Number,
//             workouts: [
//                 { }
//             ]
//         }
//
//     ]
// })

//==========
// workouts schema
//===========
var workoutsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    exercices: [
        {
            name:{
                type: String,
                required: true
            },
            rounds:{
                type: Array,
                required: true
            }

        }
    ]
})

var guideSchema =  new mongoose.Schema({
    week : String,
    sessions: [
        {
            session: String,
            exercises : Object
        }
    ]
})



var Workout = mongoose.model("Workout",workoutsSchema)
var Strengthguide  = mongoose.model("Strengthguide",guideSchema)
// Workout.remove({},function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("removed workouts")
//     }
// })
// Workout.create({
//     name: "Clalaca",
//     exercices : [
//         {
//             name: "Burppes",
//             rounds: [50,40,30,20,10]
//         },
//         {
//             name: "Squats",
//             rounds:[50,40,30,20,10]
//         },
//         {
//             name: "Situps",
//             rounds:[50,40,30,20,10]
//         },
//
//     ]
// })

// =====================

app.get("/",function(req,res){
    res.render("landing")
})



// Create new workout

// get num of reps
app.get("/new",function(req,res){

    res.render("new")

})

app.post("/new",function(req,res){

    var rounds = req.body.rounds;
    var exe = req.body.exercise;
    res.render("createnewworkout",{rounds: rounds, exe: exe});
    console.log(rounds)
    console.log(exe)
})

// get workout
app.post("/createnewworkout",function(req,res){
    var workout = req.body.workout;
    var rounds = req.body.rounds;

    var newWorkout = {
        name : workout.name,
        exercices: {
            name: workout.exercise,
            rounds: rounds
        }



    }

    // for(var i = 0; i < workout.exercise.length; i++){
    //     exercices[workout.exercise[i]] = rounds[i]
    // }

    //
    Workout.create(newWorkout)
    // console.log(workout);
    // console.log(rounds);
    // console.log(exerc)

    res.send(newWorkout)
})
//show workout

app.get("/workouts",function(req,res){

    Workout.find({},function(err,allWorkouts){
        if(err){
            console.log(err)
        }else{
            res.render("workouts",{allWorkouts : allWorkouts})
        }
    })
})

app.get("/workouts/:id",function(req,res){
    res.render("workouts")
})

// guide routes
//strength guide

app.get("/strength",function(req,res){
    Strengthguide.find({},function(err,guide){
        if(err){
            console.log(err)
        }else {
            console.log(guide)
            res.render("strength/index",{guide : guide})

        }
    })

})



app.listen(4001,function(){
     console.log("server starded!")
})