const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const passport = require("passport")
const User =  require("../model/User");
const dotenv = require('dotenv');
dotenv.config();

// For session //

passport.serializeUser((user, done) => {   done(null, user); });
 
passport.deserializeUser((id, done) => {  
      User.findById(id).then((user) => {
      done(null, user);   }); 
});

//Google auth
passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID1,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET1,
          callbackURL: "/auth/google/callback",
        },
            async(accessToken, refreshToken, profile, done) => {
                  console.log("start   \n");
                  // console.log(profile);
                  // console.log(profile.emails[0].value);

                  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                  //       return cb(err, user);
                  //     });

             const existingUser = await User.findOne({email:profile.emails[0].value})
             console.log("existingUser  ",existingUser);
             if(existingUser){
                  console.log("success1\n");
                
                 return done(null, existingUser);
             }
             else{
                  console.log("success2"  ,profile.id);
                 const user= new User({ googleId: profile.id ,
                        username:profile.displayName,
                        email:profile.emails[0].value
                  })
                  await user.save();
                  return done(null, user)
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



