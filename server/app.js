const feathers = require('@feathersjs/feathers');
const path = require('path');
const express = require('@feathersjs/express');
const services = require('./services');
const { dbConnection } = require('./database/models');

const app = express(feathers())
  .set('port', process.env.PORT || 4040)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .configure(dbConnection)
  .configure(express.rest())
  .configure(services)
  .use(express.errorHandler())
  .use(express.static(path.join(__dirname, '..', 'client', 'build')))
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });


module.exports = app;
