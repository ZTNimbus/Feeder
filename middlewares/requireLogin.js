function requireLogin(req, res, next) {
  if (!req.user)
    return res
      .status(401)
      .send({ error: "Authentication is required for this action." });

  next();
}

export default requireLogin;
