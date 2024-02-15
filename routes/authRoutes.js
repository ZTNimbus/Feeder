import passport from "passport";
import express from "express";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", //Asks to select Google accounts again when relogging in
  })
);

//Redirected to this route after Google authentication
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => res.redirect("/surveys")
);

router.get("/api/current", (req, res) => {
  res.json(req.user);
});

router.get("/api/logout", (req, res) => {
  req.logout();

  res.redirect("/");
});

export { router };
