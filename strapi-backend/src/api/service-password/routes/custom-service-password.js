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
        description: 'Get all passwords belonging to the logged-in user only',
        type: 'content-api',
      },
    },
  ],
};
