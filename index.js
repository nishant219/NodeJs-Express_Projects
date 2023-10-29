const express=require("express");
const connectionWithDB=require("./config/DB");
require ("dotenv").config();
const googlePassportConfig= require("./passport/googlePassport");
const passport=require("passport");
const cookieSession=require("cookie-session");

const authRoutes=require("./routes/auth");

const app=express();

connectionWithDB();

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
}))


app.use(passport.initialize());
app.use(passport.session());

const isLoogedIn=(req, res, next)=>{
    if(req.user){
        next();
    }else{
        res.redirect("/auth/login");
    }
}


app.set("view engine", "ejs");

app.use("/auth", authRoutes);

app.get("/", isLoogedIn, (req, res)=>{
    res.render("home");
});

app.listen(4000, ()=>{
    console.log("Server is running on port 4000");
})