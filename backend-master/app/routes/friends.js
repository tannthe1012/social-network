const express = require('express');
const { friends: friendsController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.get('/friends/request', auth, friendsController.myRequest);
router.post('/friends', auth, friendsController.addFriend);
router.post('/friends/accept', auth, friendsController.acceptFriendRequest);

module.exports = router;
