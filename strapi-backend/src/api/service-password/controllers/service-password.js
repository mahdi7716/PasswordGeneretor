'use strict';

/**
 * service-password controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-password.service-password', ({ strapi }) => ({
  async customFindMine(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in.');
    }

    const entries = await strapi.entityService.findMany('api::service-password.service-password', {
      filters: {
        user: user.id,
      },
    });

    return entries;
  },
}));
