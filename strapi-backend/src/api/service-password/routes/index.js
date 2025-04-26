'use strict';

const customRoutes = require('./custom-service-password');

module.exports = {
  routes: [
    ...customRoutes.routes,
  ],
};
