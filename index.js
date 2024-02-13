//Do not forget to set up engines in package.json
import express from "express";

import "./models/User.js"; //to have everything inside executed, should run first in order to create/update the model
import "./services/passport.js"; //to have everything inside executed, should run after Users.js due to the logic inside

import mongoose from "mongoose";
import passport from "passport";
import cookieSession from "cookie-session";

import { router as authRouter } from "./routes/authRoutes.js";
import connectToMongoDB from "./services/connectToMongoDB.js";

import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config(); //Ensures that variables in .env are only applied during development. //Prod. will use env variables set in host website.

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //These cookies can only live for 30 days at max
    keys: [process.env.COOKIE_KEYS],
  })
);

app.use(passport.initialize());
app.use(passport.session());

connectToMongoDB(mongoose);

app.use(authRouter);

app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login</a>");
});

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
