const router = require('express').Router();
const { User } = require('../../models');

// POST route for signing up new user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = userData.id;
      req.session.username = userData.username;

      res.json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// POST route for logging in user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    };

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = userData.id;
      req.session.username = userData.username;
      res.json({ message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// POST route for logging out user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})





module.exports = router;