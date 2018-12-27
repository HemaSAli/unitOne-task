/*
Confiration of database and Create the Object of Knex
*/

const knex = require('knex');
require('env2')('./config.env');
const { DB_CONFIG } = require('../../../config.js');

// get the env Values

const {
  user, password, database, host, port,
} = DB_CONFIG;

// Create the connection of database using env values
module.exports = knex({
  client: 'mysql', // type of database
  connection: {
    // database values
    host,
    user,
    password,
    database,
    port,
  },
  pool: { min: 0, max: 7 }, // set the Pool min and max values
  acquireConnectionTimeout: 10000, // TimeOut of connection to database
});
