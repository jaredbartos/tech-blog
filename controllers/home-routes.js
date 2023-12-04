const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET route to show all posts on homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts, loggedIn: req.session.loggedIn, username: req.session.username });
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET route for individual post and comments of post
// Will only show if user is logged in
router.get('/posts/:postID', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.postID, {
      include: [
        {
          model: User,
        }
      ],
    });

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.postID,
      },
      include: [
        {
          model: User,
        }
      ],
    })

    if (!postData) {
      res.status(404).json({ message: 'No post exists with that id!' });
      return;
    };

    const post = postData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('post', { post, comments, loggedIn: req.session.loggedIn, username: req.session.username });
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET route for login page
router.get('/login', (req, res) => {
  res.render('login');
});

// GET route for signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;