let express =  require("express");
let router = express.Router();
let Listings = require("../models/listings.js");
let experr = require("../utils/experr.js");




router.get("/",async(req,res)=>{
 let data =   await Listings.find();
   res.render("./listings/index.ejs",{data});
});
router.get("/new",(req,res)=>{
  res.render("./listings/new.ejs");
});


router.get("/:id",async(req,res)=>{
  let {id} = req.params;
  let info = await Listings.findById(id);
  res.render("./listings/show.ejs",{info});
});
router.post("/:id/edit",async(req,res)=>{
  let {id} = req.params;
let edit =  await Listings.findById(id);
res.render("./listings/edit.ejs",{edit});
});
router.put("/:id",async(req,res)=>{
  let {id} = req.params;
  await Listings.findByIdAndUpdate(id,{...req.body.edit}) 
   res.redirect(`/listings/${id}`);
 });
router.post("/",async(req,res)=>{
let datasave = await new Listings(req.body.listings);
  await datasave.save();
  console.log(datasave);
  res.redirect("/listings");

});



router.delete("/:id",async(req,res)=>{
  let {id} = req.params;
  await Listings.findByIdAndDelete(id);
  res.redirect("/listings");
})






module.exports=router;