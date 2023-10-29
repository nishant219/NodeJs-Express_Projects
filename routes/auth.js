const express=require("express");
const router=express.Router();
const passport=require("passport");


    router.get("/login", (req,res)=>{
        res.render("login");
    })

    router.get("/logout", (req,res)=>{
        req.logout(); // This logout() is provided by passport
        res.redirect("/");
    })


    router.get("/google",
            passport.authenticate('google', { scope:["profile", "email"] , failureRedirect: '/login' }),    
            (req,res)=>{
                res.send("Login with google");
        })

    router.get("/spotify",
            passport.authenticate('spotify', { scope:["profile", "email"] , failureRedirect: '/login' }),
            (req, res)=>{
                res.send("Login with spotify");
        })

    router.get("/google/callback", passport.authenticate('google'),    
        (req,res)=>{
            res.send(req.user);
    }) 
    
    router.get("/spotify/callback", passport.authenticate('spotify'),    
        (req,res)=>{
            res.send("Spotify callback");
    })


module.exports=router;