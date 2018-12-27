
/*
require the connection and Create Item table If not exists
*/

const dbConnection = require('../config');

const items = (async () => {
  const exists = await dbConnection.schema.hasTable('items'); // Check If Table not exists
  if (!exists) {
    await dbConnection.schema.createTable('items', (table) => { // Create the Table
      // Creating the Table Columns
      table.increments('id');
      table.string('title');
      table.text('description');
      table.text('img');
      table.text('createdAt');
    });
  }
})();

module.exports = items;
