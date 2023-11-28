const { Comment } = require('../models');

const commentData = [
  {
    content: 'I just learned about this in my class!',
    user_id: 2,
    post_id: 1,
  }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;