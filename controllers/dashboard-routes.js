const router = require('express').Router();
const { User, Post } = require('../models');
// Import custom middleware
const withAuth = require('../utils/auth');

// GET route for dashboard posts retrieval
router.get('/', withAuth, async (req, res) => {
  try {
    if (req.session.userID) {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.userID,
        },
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('dashboard', { posts, loggedIn: req.session.loggedIn, main: true });
    };
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET route to render the new post page for the dashboard
router.get('/new', withAuth, (req, res) => {
  res.render('dashboard', { loggedIn: req.session.loggedIn, new: true });
});

// GET route to retrieve post for updating or deleting on client-side
router.get('/posts/:postID', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.postID);

    const post = postData.get({ plain: true });

    res.render('dashboard', { post, loggedIn: req.session.loggedIn, edit: true })
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;