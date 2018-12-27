
const dbConnection = require('../config');

const items = (async () => {
  const exists = await dbConnection.schema.hasTable('items');
  if (!exists) {
    await dbConnection.schema.createTable('items', (table) => {
      table.increments('id');
      table.string('title');
      table.text('description');
      table.text('img');
      table.text('createdAt');
    });
  }
})();

module.exports = items;
