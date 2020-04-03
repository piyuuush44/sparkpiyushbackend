const {Joi} = require('celebrate');

module.exports = {
  getCitiesByUser: {
    params: Joi.object()
      .keys({
        id: Joi.string().required(),
      }),
  },
  postAddCity: {
    params: Joi.object()
      .keys({
        id: Joi.string().required(),
      }),
    body: Joi.object()
      .keys({
        city: Joi.string().required(),
      }),
  },
  putRemoveCity: {
    params: Joi.object()
      .keys({
        id: Joi.string().required(),
      }),
    body: Joi.object()
      .keys({
        city: Joi.string().required(),
      }),
  },
};
