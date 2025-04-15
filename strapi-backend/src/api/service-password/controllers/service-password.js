'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-password.service-password', ({ strapi }) => ({
  // فقط رمزهای کاربر لاگین شده
  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to access your passwords.");
    }

    const entries = await strapi.entityService.findMany('api::service-password.service-password', {
      filters: { user: user.id },
      populate: ['user'],
    });

    return entries;
  },

  // ساخت رمز با اتصال خودکار به کاربر
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to create passwords.");
    }

    // داده‌هایی که از سمت کلاینت میان
    const { title, username, password, url } = ctx.request.body.data;

    // ساخت رکورد جدید
    const newEntry = await strapi.entityService.create('api::service-password.service-password', {
      data: {
        title,
        username,
        password,
        url,
        user: user.id, // اتصال به کاربر فعلی
      },
    });

    return newEntry;
  },
}));
