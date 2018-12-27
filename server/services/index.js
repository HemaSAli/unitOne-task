
const items = require('./items/itemsService');

module.exports = (app) => {
  app.configure(items);
};
