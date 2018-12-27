const featherService = require('feathers-knex');
const hooks = require('./itemsHooks');
const dbConnection = require('../../database/config');

module.exports = async (app) => {
  const options = {
    name: 'items',
    Model: dbConnection,
    paginate: {
      default: 9,
      max: 50,
    },
  };
  app.use('/items', featherService(options));
  app.service('items').hooks(hooks);
};
