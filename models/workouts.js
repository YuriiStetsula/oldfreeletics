var mongoose = require("mongoose")

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

module.exports = mongoose.model("Workout",workoutsSchema);