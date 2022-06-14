const express = require('express');
const mongoose = require('mongoose')
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const authRoute = require("./routes/auth")
const userRoutes = require("./routes/user")
const cookieSession = require('cookie-session');
const passport = require("passport")

const passportSetup = require("./utils/passport");

dotenv.config();
app.use(
      cookieSession({ name: "session", keys: ["leander"], maxAge: 60 * 60 * 100 })
);
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
      })
    );
    
mongoose.connect(process.env.MONGO_URI).then(console.log("Connected to mongodb")).catch((err)=>{console.log("invalid",err)})


app.use(express.json());

app.use("/auth",authRoute);
app.use("/users",userRoutes);



app.listen(process.env.PORT || 8000,() =>{
      console.log(`Connected to port ${process.env.PORT}`);
})