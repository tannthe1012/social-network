const Joi = require('joi');

const postsService = require('../../services/posts');
const { abort } = require('../../../helpers/error');

async function validation(postInfo) {
  try {
    const schema = Joi.object().keys({
      postId: Joi.number().integer().required(),
    });

    return await Joi.validate(postInfo, schema);
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getCommentPost(req, res) {
  const postInfo = {
    postId: Number(req.params.postId),
  };

  await validation(postInfo);

  const response = await postsService.getCommentPost(postInfo);
  return res.status(200).send(response);
}

module.exports = getCommentPost;
