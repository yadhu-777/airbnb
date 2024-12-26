

let express = require("express");
let router = express.Router({ mergeParams:true }); 
let Listings = require("../models/listings.js");
let Review = require("../models/review.js");

router.post("/", async (req, res) => {
    let { id } = req.params;
    
    let listing = await Listings.findById(id);
    if (!listing.reviews) {
        listing.reviews = [];
    }

    let init = new Review(req.body.review);
    await init.save();
    listing.reviews.push(init);
    await listing.save();
    
    res.redirect(`/listings/${id}`);
});

router.delete("/:revid",async(req,res)=>{
    let{id,revid} = req.params;
   
    await Listings.findByIdAndUpdate(id,{$pull:{reviews:revid}});
    await Review.findByIdAndDelete(revid);
    res.redirect(`/listings/${id}`);
   
   
})

module.exports = router;