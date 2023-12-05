// Middleware to check for authorization when display certain pages
const withAuth = async (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  };

  next();
};

module.exports = withAuth;