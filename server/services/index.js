const items = require('./items/itemsService');
/*
Require all Services and cofigure if whit App
*/
module.exports = (app) => {
  app.configure(items);
};
