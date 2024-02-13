import passport from "passport";
import express from "express";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//Redirected to this route after Google authentication
router.get("/auth/google/callback", passport.authenticate("google"));

router.get("/test/auth", (req, res) => {
  res.send(req.user);
});

router.get("/api/logout", (req, res) => {
  req.logOut();
  res.send(req.user);
});

export { router };
