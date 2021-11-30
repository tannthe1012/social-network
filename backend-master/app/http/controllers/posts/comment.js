const Joi = require('joi');

const postsService = require('../../services/posts');
const { abort } = require('../../../helpers/error');

async function validation(postInfo) {
  try {
    const schema = Joi.object().keys({
      postId: Joi.number().integer().min(1).required(),
      userId: Joi.number().integer().min(1).required(),
      content: Joi.string().required(),
    });

    return await Joi.validate(postInfo, schema);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function comment(req, res) {
  const postInfo = {
    postId: req.body.postId,
    content: req.body.content,
    userId: req.user.id,
  };

  await validation(postInfo);

  await postsService.comment(postInfo);
  return res.status(201).send();
}

module.exports = comment;
