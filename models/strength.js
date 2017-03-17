var mongoose = require("mongoose")

var guideSchema =  new mongoose.Schema({
    week : String,
    sessions: [
        {
            session: String,
            exercises : Object
        }
    ]
})

module.exports = mongoose.model("Strengthguide",guideSchema);