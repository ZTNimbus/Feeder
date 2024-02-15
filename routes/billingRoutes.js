import express from "express";
import Stripe from "stripe";

import requireLogin from "../middlewares/requireLogin.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/api/stripe", requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "Feeder credits",
    source: req.body.id,
  });

  req.user.credits += 5;
  const user = await req.user.save();

  res.send(user);
});

export { router };
