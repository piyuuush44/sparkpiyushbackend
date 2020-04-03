const {Joi} = require('celebrate');

module.exports = {
  login: {
    body: Joi.object().keys({
      password: Joi.string().required().lowercase()
        .trim(),
      email: Joi.string().email().required().lowercase()
        .trim(),
    }),
  },
  register: {
    body: Joi.object().keys({
      password: Joi.string().required().lowercase()
        .trim(),
      email: Joi.string().email().required().lowercase()
        .trim(),
      name: Joi.string().required().min(1).max(100)
        .trim(),
    }),
  },
};
