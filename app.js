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

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.DATABASEURL);
console.log(process.env.DATABASEURL);


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
});

var Workout = mongoose.model("Workout",workoutsSchema);
//========
//Guides schemas
//=========
var guideSchema =  new mongoose.Schema({
    week : String,
    sessions: [
        {
            session: String,
            exercises : Object
        }
    ]
})


var Strengthguide             = mongoose.model("Strengthguide",guideSchema);
var Cardioguide               = mongoose.model("Cardioguide",guideSchema);
var CardioAndStrengthguide    = mongoose.model("CardioAndStrengthguide",guideSchema);

//==========
//exercises
//==========

var exerciseSchema = new mongoose.Schema({
    name : String,
    description : {
        fullVersion:{
            images: Array,
            text: String
        },
        modifiedVersion:{
            images: Array,
            text: String
        }
    }
})

var Exercise = mongoose.model("Exercise",exerciseSchema);



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

});



app.get("/cardio",function(req,res){
    Cardioguide.find({},function(err,guide){
        if(err){
            console.log(err)
        }else {
            console.log(guide)
            res.render("cardio/index",{guide : guide})

        }
    })

})

app.get("/cardioandstrength",function(req,res){
    CardioAndStrengthguide.find({},function(err,guide){
        if(err){
            console.log(err)
        }else {
            console.log(guide)
            res.render("cardioandstrength/index",{guide : guide})

        }
    })

})

//========
// exercises route
//=========

app.get("/exercises", function(req,res){
    Exercise.find({},function(err,exercise){
        if(err){
            console.log(err)
        }else{
            res.render("exercises/index",{exercise:exercise})
        }
    })

});

app.get("/exercises/:id", function(req,res){
    res.render("exercises/index")
})


app.listen(4001,function(){
     console.log("server starded!")
})