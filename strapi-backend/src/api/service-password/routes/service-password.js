'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-passwords',
      handler: 'service-password.find',
      config: {
        auth: { mode: 'authenticated' },
      },
    },
    {
      method: 'GET',
      path: '/service-passwords/:id',
      handler: 'service-password.findOne',
      config: {
        auth: { mode: 'authenticated' },
      },
    },
    {
      method: 'POST',
      path: '/service-passwords',
      handler: 'service-password.create',
      config: {
        auth: { mode: 'authenticated' },
      },
    },
    {
      method: 'PUT',
      path: '/service-passwords/:id',
      handler: 'service-password.update',
      config: {
        auth: { mode: 'authenticated' },
      },
    },
    {
      method: 'DELETE',
      path: '/service-passwords/:id',
      handler: 'service-password.delete',
      config: {
        auth: { mode: 'authenticated' },
      },
    },
    {
      method: 'GET',
      path: '/service-passwords/me',
      handler: 'service-password.customFindMine',
      config: {
        auth: { mode: 'authenticated' },
      },
      info: {
        name: 'customFindMine',
        description: 'Get passwords for the current user',
        type: 'content-api',
      },
    },
  ],
};
