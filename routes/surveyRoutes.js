import express, { response } from "express";
import mongoose from "mongoose";

import _ from "lodash";
import { Path } from "path-parser";
import { URL } from "url";

import requireLogin from "../middlewares/requireLogin.js";
import requireCredits from "../middlewares/requireCredits.js";

import sendEmail from "../services/Mailer.js";

const router = express.Router();

const Survey = mongoose.model("surveys");

//order of middlewares attached matters!
router.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
  const { survey: title, content: body, subject, recipients } = req.body;

  const newSurvey = new Survey({
    title,
    body,
    subject,
    recipients: recipients.split(",").map((email) => ({
      email,
    })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  try {
    await sendEmail(newSurvey);
    await newSurvey.save();

    req.user.credits -= 1;
    const user = await req.user.save();

    return res.json(user);
  } catch (error) {
    console.error("SG ERROR", error);

    res.sendStatus(422).send(error);
  }
});

router.get("/api/surveys/:surveyID/:choice", (_req, res) =>
  res.send("<h2>Thank you for the feedback!</h2>")
);

router.post("/api/surveys/webhooks", (req, res) => {
  //req.body === {email, url, ...etc}
  const p = new Path("/api/surveys/:surveyID/:choice");

  const events = _.map(req.body, ({ url, email }) => {
    const pathname = new URL(url).pathname;

    const match = p.test(pathname); // Either returns an object with the requested fields from URL or returns undefined.
    if (match) return { email, ...match };
  }).filter((event) => event);

  //{email, surveyID, choice}
  const uniqueEvents = _.uniqBy(events, "email", "surveyID"); //Will filter out duplicate objects that have both the same email address and the same survey id.

  uniqueEvents.forEach(({ surveyID, choice, email }) => {
    Survey.updateOne(
      {
        _id: surveyID,
        recipients: {
          $elemMatch: { email: email, responded: false },
        },
      },
      {
        $inc: { [choice]: 1 },
        $set: { "recipients.$.responded": true },
        lastResponded: new Date(),
      }
    ).exec();
  });

  res.json({});
});

router.get("/api/surveys", requireLogin, async (req, res) => {
  // respond with current user's created surveys
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  }); // Give every survey created by current user with all of its details EXCEPT the recipients list(which can be large)

  res.json(surveys);
});

export { router };
