const router = require('express').Router();
const { Post } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userID,
    });
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:postID', async (req, res) => {

});



module.exports = router;