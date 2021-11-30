const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const auth = require('../../services/auth');

const validate = async (params) => {
  const schema = Joi.object({
    email: Joi.string().email().max(127).required(),
    fullName: Joi.string().min(3).max(127).required(),
    mssv: Joi.string().min(3).max(127).required(),
    password: Joi.string().min(6).max(127).required(),
    birthday: Joi.date(),
    confirmPassword: Joi.valid(Joi.ref('password')).required(),
    gender: Joi.valid([0, 1, 2]),
    province: Joi.string().max(127),
    district: Joi.string().max(127),
    slogan: Joi.string().max(127),
  });
  try {
    await Joi.validate(params, schema);
  } catch (error) {
    abort(400, 'Params Error');
  }
};

const signUp = async (req, res) => {
  const params = {
    email: req.body.email,
    fullName: req.body.fullName,
    mssv: req.body.mssv,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    province: req.body.province,
    district: req.body.district,
    slogan: req.body.slogan,
    gender: req.body.gender,
    birthday: req.body.birthday,
  };
  await validate(params);
  await auth.signUp(params);
  return res.sendStatus(201);
};

module.exports = signUp;
