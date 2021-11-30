function auth(req, res, next) {
  if (!req.user) {
    return res.status(403).send({
      error: 'You must be logged in',
    });
  }

  return next();
}

module.exports = auth;
