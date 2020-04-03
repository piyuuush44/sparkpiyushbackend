const Schema = require('./schema');
const Controller = require('./controller');

module.exports = [
  {
    method: 'get',
    route: '/',
    controller: Controller.getHealth,
  },
  {
    method: 'post',
    route: '/login',
    schema_validation: Schema.login,
    controller: Controller.postLogin,
  },
  {
    method: 'post',
    route: '/register',
    schema_validation: Schema.register,
    controller: Controller.postRegister,
  },
];
