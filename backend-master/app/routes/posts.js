const express = require('express');
const { posts: postsController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/posts', auth, postsController.getPosts);
router.post('/posts', auth, postsController.addPost);
router.get('/my-posts', auth, postsController.getMyPosts);
router.post('/posts/like', auth, postsController.likePost);
router.post('/posts/comment', auth, postsController.comment);
router.get('/posts/:postId/comment', auth, postsController.getCommentPost);

module.exports = router;
