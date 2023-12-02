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

router.delete('/:postID', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.postID,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post exists with that id!' });
      return;
    };

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  };
});



module.exports = router;