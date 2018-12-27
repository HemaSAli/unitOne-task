const featherService = require('feathers-knex');
const hooks = require('./itemsHooks');
const dbConnection = require('../../database/config');

/*
get the dbConnection after create the tables and set the feather Services whith the Item services
*/

module.exports = async (app) => {
  // set the options of Service
  const options = {
    name: 'items',
    Model: dbConnection,
    paginate: {
      default: 9,
      max: 50,
    },
  };
  // set the feather-knex service to Item services
  app.use('/items', featherService(options));
  // set the Hooks to Item service
  app.service('items').hooks(hooks);
};
