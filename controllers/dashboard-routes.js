const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/new', withAuth, (req, res) => {
  res.render('dashboard', { loggedIn: req.session.loggedIn, new: true });
});

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