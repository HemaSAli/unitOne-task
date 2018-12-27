const knex = require('knex');

require('env2')('./config.env');
const { DB_CONFIG } = require('../../../config.js');

const {
  user, password, database, host,
} = DB_CONFIG;

module.exports = knex({
  client: 'mysql',
  connection: {
    host,
    user,
    password,
    database,
  },
  pool: { min: 0, max: 7 },
  acquireConnectionTimeout: 10000,
});
