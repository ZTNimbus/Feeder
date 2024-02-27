function requireCredits(req, res, next) {
  if (req.user.credits < 1)
    res.sendStatus(403).json({ error: "Not enough credits for this action." });

  next();
}
export default requireCredits;
