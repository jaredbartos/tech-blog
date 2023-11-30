const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')

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

    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  };

})

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

    const post = postData.get({ plain: true });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(post);

    console.log(comments);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;