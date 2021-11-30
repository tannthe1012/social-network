const Joi = require('joi');

const friendsService = require('../../services/friends');
const { abort } = require('../../../helpers/error');

async function validation(friendInfo) {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().integer().min(1).required(),
      friendId: Joi.number().integer().min(1).required(),
    });

    return await Joi.validate(friendInfo, schema);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function addFriend(req, res) {
  const friendInfo = {
    userId: req.user.id,
    friendId: req.body.friendId,
  };

  await validation(friendInfo);

  await friendsService.addFriend(friendInfo);
  return res.status(201).send();
}

module.exports = addFriend;
