const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => {
        context.data.createdAt = Date.now(); // set the Created Date of Item
        const { title, description, img } = context.data;
        if (!title.trim() || !description.trim() || !img.trim()) { // Check that no fields Empty
          throw new errors.BadRequest(); // send 400 error If any field empty
        }
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
