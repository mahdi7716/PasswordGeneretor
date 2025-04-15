'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::password-config.password-config', ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("شما لاگین نیستید!");
    }

    // فقط داده‌های کاربر لاگین‌شده
    ctx.query = {
      ...ctx.query,
      filters: {
        ...ctx.query.filters,
        user: user.id,
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));
