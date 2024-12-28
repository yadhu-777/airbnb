let express = require("express");
let User = require("../models/user.js");
let wrapAsync = require("../utils/wrapAsync.js");
let router = express.Router(); 
let passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("./users/form.ejs");
});

router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let regUser = await User.register(newUser, password);
        console.log(regUser);
        req.flash("success", "Successfully signed up and logged in!");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("./users/login.ejs");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    req.flash("success", "Successfully logged in!");
    res.redirect("/listings");
});

module.exports = router;
