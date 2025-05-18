'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { ForbiddenError, NotFoundError } = require('@strapi/utils').errors;

module.exports = createCoreController('api::service-password.service-password', ({ strapi }) => ({
  
  // گرفتن رمزهای متعلق به کاربر لاگین شده
  async find(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("You must be logged in.");

    const entries = await strapi.entityService.findMany('api::service-password.service-password', {
      filters: { user: user.id },
    });

    ctx.send(entries);
  },

  // دریافت یک رمز خاص اگر متعلق به کاربر لاگین شده باشد
  async findOne(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    if (!user) return ctx.unauthorized("You must be logged in.");

    const entry = await strapi.entityService.findOne('api::service-password.service-password', id, {
      populate: ['user'],
    });

    if (!entry) return ctx.notFound("Password not found.");
    if (!entry.user || entry.user.id !== user.id) {
      return ctx.forbidden("You are not allowed to access this password.");
    }

    ctx.send(entry);
  },

  // ساخت رمز جدید برای کاربر لاگین شده
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("You must be logged in.");

    const { title, value } = ctx.request.body.data;
    if (!title || !value) return ctx.badRequest("Title and value are required.");

    const entry = await strapi.entityService.create('api::service-password.service-password', {
      data: {
        title,
        value,
        user: user.id,
      },
    });

    ctx.send(entry);
  },

  // ویرایش رمز در صورتی که متعلق به خود کاربر باشد
  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    const existing = await strapi.entityService.findOne('api::service-password.service-password', id, {
      populate: ['user'],
    });

    if (!existing) throw new NotFoundError('Service password not found');
    if (existing.user.id !== user.id) throw new ForbiddenError('You are not allowed to update this password');

    const updated = await strapi.entityService.update('api::service-password.service-password', id, {
      data,
    });

    ctx.body = updated;
  },

  // حذف رمز در صورتی که متعلق به خود کاربر باشد
  async delete(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    const existing = await strapi.entityService.findOne('api::service-password.service-password', id, {
      populate: ['user'],
    });

    if (!existing) throw new NotFoundError('Service password not found');
    if (existing.user.id !== user.id) throw new ForbiddenError('You are not allowed to delete this password');

    const deleted = await strapi.entityService.delete('api::service-password.service-password', id);
    ctx.body = deleted;
  },

  // مسیر اختصاصی برای گرفتن رمزهای خود کاربر (اختیاری)
  async customFindMine(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('You must be logged in.');

    const entries = await strapi.entityService.findMany('api::service-password.service-password', {
      filters: { user: user.id },
    });

    ctx.body = entries;
  },

}));
