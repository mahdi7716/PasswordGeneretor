'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-password.service-password', ({ strapi }) => ({

  // گرفتن فقط رمزهای کاربر لاگین شده (برای /service-passwords)
  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to access your passwords.');
    }

    const entries = await strapi.entityService.findMany('api::service-password.service-password', {
      filters: { user: user.id },
      populate: ['user'],
    });

    return { data: entries };
  },

  // ایجاد رمز جدید با اتصال به کاربر لاگین شده
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to create a password.');
    }

    const { title, username, password, url } = ctx.request.body.data;

    const newEntry = await strapi.entityService.create('api::service-password.service-password', {
      data: {
        title,
        username,
        password,
        url,
        user: user.id,
      },
    });

    return { data: newEntry };
  },

  // مسیر اختصاصی برای گرفتن رمزهای خود کاربر — /service-passwords/me
  async customFindMine(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to access your own passwords.');
    }

    const entries = await strapi.entityService.findMany('api::service-password.service-password', {
      filters: { user: user.id },
      populate: ['user'],
    });

    return { data: entries };
  },

}));
