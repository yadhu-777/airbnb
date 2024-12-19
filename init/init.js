let mongoose = require("mongoose");
let  Listings = require("../models/listings.js");
let info = require("./data.js");
main()
.then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
};


let initData = async(req,res) =>{
   await Listings.deleteMany({});
   let ress = await Listings.insertMany(info.data);
   console.log(ress);
}

initData();