function requireLogin(req, res, next) {
  if (!req.user)
    return res
      .sendStatus(401)
      .json({ error: "Authentication is required for this action." });

  next();
}

export default requireLogin;
