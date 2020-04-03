const Middleware = require('./middlewares');
const Controller = require('./controller');
const Schema = require('./schema');
module.exports = [
  {
    method: 'get',
    route: '/cities/:id',
    schema_validation: Schema.getCitiesByUser,
    middlewares: [Middleware.checkUserById],
    controller: Controller.getCitiesByUser,
  },
  {
    method: 'post',
    route: '/city/:id',
    schema_validation: Schema.postAddCity,
    middlewares: [Middleware.checkUserById],
    controller: Controller.postAddCity,
  },
  {
    method: 'put',
    route: '/city/:id',
    schema_validation: Schema.putRemoveCity,
    middlewares: [Middleware.checkUserById],
    controller: Controller.putRemoveCity,
  },
];
