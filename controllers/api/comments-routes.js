const router = require('express').Router();
const { Comment } = require('../../models');

// POST route for new comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      user_id: req.session.userID,
      post_id: req.body.post_id,
    });
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  };
})

module.exports = router;