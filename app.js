/**
 * Created by admin on 07.03.2017.
 */
var express     = require ("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),

    app         = express();

var strengthRoute = require ("./routes/strength"),
    cardioRoute   = require ("./routes/cardio"),
    cardioandstrengthRoute = require ("./routes/cardioandstrength"),
    workoutsRoute = require ("./routes/workouts"),
    exercisesRoute = require ("./routes/exercises");


mongoose.connect(process.env.DATABASEURL);
console.log(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine","ejs")





app.get("/",function(req,res){
    res.render("landing")
})

app.use ("/strength",strengthRoute);
app.use ("/cardio",cardioRoute);
app.use ("/cardioandstrength", cardioandstrengthRoute);
app.use ("/workouts",workoutsRoute)
app.use ("/exercises",exercisesRoute)

app.use(express.static(__dirname + "/public"));









app.listen(process.env.PORT,process.env.IP,function(){
     console.log("server starded!")
})