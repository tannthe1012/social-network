const Joi = require('joi');

const friendsService = require('../../services/friends');
const { abort } = require('../../../helpers/error');

async function validation(friendInfo) {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().integer().min(1).required(),
      friendRequestId: Joi.number().integer().min(1).required(),
    });

    return await Joi.validate(friendInfo, schema);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function acceptFriendRequest(req, res) {
  const friendInfo = {
    userId: req.user.id,
    friendRequestId: req.body.friendRequestId,
  };

  await validation(friendInfo);

  await friendsService.acceptFriendRequest(friendInfo);
  return res.status(204).send();
}

module.exports = acceptFriendRequest;
