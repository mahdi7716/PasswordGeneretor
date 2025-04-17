'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/password-generator/generate',
      handler: 'password-generator.generate',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};

