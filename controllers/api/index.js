const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentsRoutes = require('./comments-routes');
const blogPostsRoutes = require('./blog-posts-routes')

router.use('/users', userRoutes);
router.use('/comments', commentsRoutes);
router.use('/posts', blogPostsRoutes);

module.exports = router;