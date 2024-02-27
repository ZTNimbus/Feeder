//Do not forget to set up engines in package.json
import express from "express";

import "./models/User.js"; //to have everything inside executed, should run first in order to create/update the model
import "./models/Survey.js";
import "./services/passport.js"; //to have everything inside executed, should run after Users.js due to the logic inside

import passport from "passport";
import cookieSession from "cookie-session";

import { router as authRouter } from "./routes/authRoutes.js";
import { router as billingRouter } from "./routes/billingRoutes.js";
import { router as surveyRouter } from "./routes/surveyRoutes.js";

import mongoose from "mongoose";
import connectToMongoDB from "./services/connectToMongoDB.js";

import path from "path";
import dotenv from "dotenv";

const mode = process.env.NODE_ENV;
if (mode !== "production") dotenv.config(); //Ensures that variables in .env are only applied during development. //Prod. will use env variables set in host website.

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
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
app.use(billingRouter);
app.use(surveyRouter);

if (mode === "production") {
  const staticPath = path.resolve(process.cwd(), "client", "dist");
  //If looking for a specific file
  app.use(express.static(staticPath));

  //All other uncaught endpoints
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(staticPath, "index.html"));
  });
}

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
