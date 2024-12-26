let mongoose = require("mongoose");


let reviewSchema = new mongoose.Schema({
    comment:{
        type:String
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
        
    }
});


let Review = mongoose.model("Review",reviewSchema);
module.exports = Review;