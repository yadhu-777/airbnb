let express =  require("express");
let User = require("../models/user.js");
let wrapAsync = require("../utils/wrapAsync.js");
let router = express.Router(); 
let passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("./users/form.ejs");
})


router.post("/signup",wrapAsync(async(req,res)=>{
   try{
    let {username,email,password} = req.body;
    let newuser = new User({email,username});
    let regser = await User.register(newuser,"alpenlibae");
    console.log(regser);
    req.flash("success","login succesfully");
    res.redirect("/listings");
   }catch(e){
    req.flash("error",e.message);
   
    res.redirect("/signup");
   }


}));
router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
})
router.post("/login",passport.authenticate("local",
    {failureRedirect:"/login",
        failureFlash:true}),
        (req,res)=>{
            req.flash("success","successfully logged In");
            res.redirect("/listings");


})
module.exports = router;