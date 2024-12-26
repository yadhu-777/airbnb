let express =  require("express");
let router = express.Router();
let Listings = require("../models/listings.js");
let experr = require("../utils/experr.js");
let wrapAsync = require("../utils/wrapAsync.js");

let validation = require("../schema.js");

let listingValidation = (req,res,next)=>{
  let {error} =  validation.validate(req.body);
  if(error){
throw new experr(500,error);
  }else{
    next();
  }
 
}


router.get("/",(async(req,res)=>{
 let data =   await Listings.find();
   res.render("./listings/index.ejs",{data});
}));
router.get("/new",(req,res)=>{
  res.render("./listings/new.ejs");
});


router.get("/:id",wrapAsync(async(req,res)=>{
  let {id} = req.params;
  let info = await Listings.findById(id).populate('reviews');
if(!info){
  let gg = req.flash("found","not found");
  res.redirect("/listings");
}else{
  res.render("./listings/show.ejs",{info});
}
 
}));
router.post("/:id/edit", wrapAsync(async(req,res)=>{
  let {id} = req.params;
let edit =  await Listings.findById(id);
res.render("./listings/edit.ejs",{edit});
}));
router.put("/:id", wrapAsync(async(req,res)=>{
  let {id} = req.params;
  let gg = req.flash("success","created listings successfully");
  await Listings.findByIdAndUpdate(id,{...req.body.edit}) 
   res.redirect(`/listings/${id}`);
 }));
router.post("/",listingValidation, wrapAsync(async(req,res)=>{
  let gg = req.flash("success","created listings successfully");
let datasave = await new Listings(req.body.listings);
  await datasave.save();
  console.log(datasave);
  res.redirect("/listings");

}));



router.delete("/:id", wrapAsync(async(req,res)=>{
  let {id} = req.params;
  await Listings.findByIdAndDelete(id);
  let gg = req.flash("error","deleted");
  res.redirect("/listings");
}));






module.exports=router;