const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const passport = require("passport")
const User =  require("../model/User");
const dotenv = require('dotenv');
dotenv.config();

// For session //

passport.serializeUser((user, done) => {   done(null, user.id); });
 
passport.deserializeUser((id, done) => {  
      User.findById(id).then((user) => {
      done(null, user);   }); 
});

//Google auth
passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
        },
            (accessToken, refreshToken, profile, done) => {
                  console.log("start   \n");
                  console.log(profile);
             const existingUser = User.findOne({ username:profile.displayName})
             if(existingUser){
                  console.log("success1\n");
                  done(null, profile);
             }
             else{
                  console.log("success2\n");
                  new User({ googleId: profile.id ,
                        username:profile.displayName,
                  })
                  .save()
                  done(null, profile)
             }
            //.then((existingUser) => {
            //     if (existingUser) {
            //       // we already have a record with the given profile ID
            //       console.log("success1 \n\n\n");
            //       done(null, profile);
            //     } else {
            //           console.log("success2 \n\n\n");
            //       // we don't have a user record with this ID, make a new record!
            //        new User({ googleId: profile.id ,
            //             username:profile.displayName,
            //       })
            //       .save()
            //         .then((user) => done(null, profile));
            //     }
            //   });
            }   
        
      )
);



