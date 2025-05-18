'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-passwords',
      handler: 'service-password.find',
      config: {
        auth: { scope: ['plugin::users-permissions.user'] },
      },
    },
    {
      method: 'GET',
      path: '/service-passwords/:id',
      handler: 'service-password.findOne',
      config: {
        auth: { scope: ['plugin::users-permissions.user'] },
      },
    },
    {
      method: 'POST',
      path: '/service-passwords',
      handler: 'service-password.create',
      config: {
        auth: { scope: ['plugin::users-permissions.user'] },
      },
    },
    {
      method: 'PUT',
      path: '/service-passwords/:id',
      handler: 'service-password.update',
      config: {
        auth: { scope: ['plugin::users-permissions.user'] },
      },
    },
    {
      method: 'DELETE',
      path: '/service-passwords/:id',
      handler: 'service-password.delete',
      config: {
        auth: { scope: ['plugin::users-permissions.user'] },
      },
    },
    {
      method: 'GET',
      path: '/service-passwords/me',
      handler: 'service-password.customFindMine',
      config: {
        auth: { mode: 'authenticated' },
      },
    },
  ],
};
