let express =  require("express");
let app  = express();
let path = require("path");
let ejsMate = require("ejs-mate");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs', ejsMate);
let mongoose = require("mongoose");
const methodOverride = require('method-override')
let Experr = require("./utils/experr.js");
let listings = require("./routes/listings.js");
app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));



main()
.then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
};

app.listen(3000,()=>{
    console.log("connected to sever");
});
app.use("/listings",listings);



app.all("*",(req,res,next)=>{
 next(  new Experr(404,"page not fpund"));
  
});
app.use((err,req,res)=>{
  let{status = 500,message="jello"} = err;
  
  res.status(status).render("./listings/error.ejs",{message});
});