'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-passwords/me',
      handler: 'service-password.customFindMine',
      config: {
        auth: { mode: 'authenticated' }
      },
      info: {
        name: 'customFindMine',
        description: 'Get passwords for the current user',
        type: 'content-api',
      },
    },
  ],
};
