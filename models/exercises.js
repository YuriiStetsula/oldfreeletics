var mongoose = require("mongoose")

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

module.exports = mongoose.model("Exercise",exerciseSchema);