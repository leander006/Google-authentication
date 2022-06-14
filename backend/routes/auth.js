const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator');
const passport = require("passport")
const dotenv = require('dotenv');
dotenv.config();

router.post('/',[
    body('email','Enter valid email').isEmail(),
    body('username','Name must be atleast 5 characters').isLength({ min: 5 }),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],asyncHandler(async(req,res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {username, email,password} = req.body;

    if(!username|| !password || !email){
       return res.status(401).json("Enter all credentails")
    }

    const userExist = await User.findOne({username})
    const emailExist = await User.findOne({email})
    try {
        if(userExist)
        {
           return res.status(400).json("Username taken")
        }
        if(emailExist)
        {
           return res.status(404).json("Email exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newuser = new User({
            username,
            email,
            password:hashPassword,
        })
        const user = await newuser.save();

        return res.status(200).send({message:"Register successfully "});
    } catch (error) {
        return res.status(505).send({message:error.message});
    }
}))


router.get("/login/success", (req, res) => {
  console.log("/login/success");
  if (req.user) {
    
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
    console.log("failed");
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  console.log("logout");
  res.redirect("http://localhost:3000");
});

router.get("/google", passport.authenticate("google", { scope: ["email","profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);





module.exports = router;