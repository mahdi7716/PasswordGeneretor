'use strict';

const customRoutes = require('./custom-service-password');

module.exports = {
  routes: [
    ...customRoutes.routes,
    {
      method: 'POST',
      path: '/service-passwords',
      handler: 'service-password.create',
      config: {
        policies: [],
        auth: {
          scope: ['plugin::users-permissions.user'],
        },
      },
    },
    {
      method: 'GET',
      path: '/service-passwords/:id',
      handler: 'service-password.findOne',
      config: {
        policies: [],
        auth: {
          scope: ['plugin::users-permissions.user'],
        },
      },
    },
    {
      method: 'PUT',
      path: '/service-passwords/:id',
      handler: 'service-password.update',
      config: {
        policies: [],
        auth: {
          scope: ['plugin::users-permissions.user'],
        },
      },
    },
    {
      method: 'DELETE',
      path: '/service-passwords/:id',
      handler: 'service-password.delete',
      config: {
        policies: [],
        auth: {
          scope: ['plugin::users-permissions.user'],
        },
      },
    },
  ],
};
