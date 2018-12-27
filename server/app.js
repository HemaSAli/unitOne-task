const feathers = require('@feathersjs/feathers');
const path = require('path');
const express = require('@feathersjs/express');
const services = require('./services');
const { dbConnection } = require('./database/models');

/*
Creating an object of express and feather and ser the configration whit Database and Services
*/

const app = express(feathers())
  .set('port', process.env.PORT || 4040)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  // Configure of Connection after Create the tables
  .configure(dbConnection)
  // Enable REST services
  .configure(express.rest())
  .configure(services)
  // use errorHandler of express
  .use(express.errorHandler())
  // use express of React and routes
  .use(express.static(path.join(__dirname, '..', 'client', 'build')))
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });

module.exports = app;
