const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => {
        context.data.createdAt = Date.now();
        const { title, description, img } = context.data;
        if (!title.trim() || !description.trim() || !img.trim()) {
          throw new errors.BadRequest();
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
