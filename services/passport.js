import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const googleStrat = GoogleStrategy.Strategy;
const googleClientID = process.env.GOOGLE_CLIENT_ID;

const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

//In order for this to work, a collection inside mongoDB named "users" must exist, therefore Users.js should run first
const User = mongoose.model("users"); //Giving .model() only 1 argument means we wish to create a new instance(new entry in mongodb collection)

passport.serializeUser((user, done) => {
  //user = user model instance. will turn it into id
  done(null, user.id); //this user.id is the id that's automatically created by mongodb. Not to be confused with profile.id that Google provides us.
  //The id's that providers(We used Google) give us are only processed for signing in. After that, we only refer to existing users with mongoDB's id's to be provider-independent.
});

passport.deserializeUser(async (id, done) => {
  //id = the id that was turned from user model instance in serializeUser().
  try {
    const userInDB = await User.findById(id); //ASYNC!!

    done(null, userInDB);
  } catch (error) {
    console.log(error);
    done(err);
  }
});

passport.use(
  new googleStrat(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let userInDB = await User.findOne({ googleID: profile.id }); //ASYNC!!!

      if (!userInDB) userInDB = await new User({ googleID: profile.id }).save(); //create new user entry, then .save() to save the change(insert in mongodb) ALSO ASYNC!!

      done(null, userInDB);
    }
  )
);
