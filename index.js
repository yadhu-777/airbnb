let express =  require("express");
let app  = express();
let path = require("path");
let ejsMate = require("ejs-mate");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs', ejsMate);
let mongoose = require("mongoose");
const methodOverride = require('method-override')
let ExError = require("./utils/experr.js");
let listings = require("./routes/listings.js");
app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
let reviews = require("./routes/review.js");
let joi = require("joi");
let session = require("express-session");
let flash = require("connect-flash");
let User = require("./models/user.js");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let userroute = require("./routes/user.js");



main()
.then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
};
let sessionOption ={
  secret:"secretCode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7 * 24 *60 *60 *1000,
    maxAge: Date.now()+ 7 * 24 *60 *60 *1000,
    httpOnly:true
  }

}
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.nfound = req.flash("found");
  next();
});
app.use("/listings",listings);
app.use("/listings/:id/review",reviews);
app.use("/",userroute);



app.all("*", (req, res, next) => {
  next(new ExError(404, "Page Not Found !!!"));
});
app.use((err,req,res,next)=>{
  let{status = 500,message="jello"} = err;
  
  res.status(status).render("./listings/error.ejs",{message});
});

app.listen(3000,()=>{
  console.log("connected to sever");
});