const dbConnection = require('../config');
const items = require('./items');
// Creating all Tables then export the connection after creation to be use in app.js
module.exports = {
  dbConnection,
  items,
};
