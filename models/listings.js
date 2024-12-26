let mongoose = require("mongoose");
let Review = require("./review.js");

let Schema = mongoose.Schema;

let listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        filename:{type:String},
        url:{type:String,default:"https://images.unsplash.com/photo-1726942371143-3afca583a72f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set:(v)=> v ===" " ? "default" : v
        }
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }]
    
});

let Listings = mongoose.model("Listings",listingSchema);
module.exports = Listings;
