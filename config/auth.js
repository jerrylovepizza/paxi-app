// passport built in req.isAuthenticated() to check if logged in

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json(req.user);
  }
};
