// 'use strict';

// /**
//  * service-password controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::service-password.service-password', ({ strapi }) => ({
//   async customFindMine(ctx) {
//     const user = ctx.state.user;

//     if (!user) {
//       return ctx.unauthorized('You must be logged in.');
//     }

//     const entries = await strapi.entityService.findMany('api::service-password.service-password', {
//       filters: {
//         user: user.id,
//       },
//     });

//     return entries;
//   },
// }));

// const { ForbiddenError, NotFoundError } = require('@strapi/utils').errors;

// module.exports = {
//   async update(ctx) {
//     const user = ctx.state.user; // کاربر لاگین شده
//     const { id } = ctx.params;   // آیدی رکوردی که میخواهیم ویرایش کنیم
//     const { data } = ctx.request.body; // داده‌های جدید برای بروزرسانی

//     const servicePassword = await strapi.entityService.findOne('api::service-password.service-password', id, {
//       populate: { user: true },
//     });

//     if (!servicePassword) {
//       throw new NotFoundError('Service password not found');
//     }

//     if (servicePassword.user.id !== user.id) {
//       throw new ForbiddenError('You are not allowed to update this password');
//     }

//     const updatedEntry = await strapi.entityService.update('api::service-password.service-password', id, {
//       data,
//     });

//     ctx.body = updatedEntry;
//   },

//   async delete(ctx) {
//     const user = ctx.state.user;
//     const { id } = ctx.params;

//     const servicePassword = await strapi.entityService.findOne('api::service-password.service-password', id, {
//       populate: { user: true },
//     });

//     if (!servicePassword) {
//       throw new NotFoundError('Service password not found');
//     }

//     if (servicePassword.user.id !== user.id) {
//       throw new ForbiddenError('You are not allowed to delete this password');
//     }

//     const deletedEntry = await strapi.entityService.delete('api::service-password.service-password', id);

//     ctx.body = deletedEntry;
//   },
// };
// module.exports = {
// async create(ctx) {
//   const user = ctx.state.user;

//   if (!user) {
//     return ctx.unauthorized("You must be logged in to create a password.");
//   }

//   try {
//     const { title, value } = ctx.request.body.data;

//     if (!title || !value) {
//       return ctx.badRequest("Title and value are required.");
//     }

//     const entry = await strapi.entityService.create('api::service-password.service-password', {
//       data: {
//         title,
//         value,
//         user: user.id, // وصل کردن پسورد به کاربر لاگین شده
//       },
//     });

//     ctx.send(entry);
//   } catch (err) {
//     console.error(err);
//     ctx.internalServerError("An error occurred while creating the password.");
//   }
// }
// }
// module.exports = {
// async find(ctx) {
//   const user = ctx.state.user;

//   if (!user) {
//     return ctx.unauthorized("You must be logged in to view your passwords.");
//   }

//   try {
//     const entries = await strapi.entityService.findMany('api::service-password.service-password', {
//       filters: {
//         user: user.id,
//       },
//     });

//     ctx.send(entries);
//   } catch (err) {
//     console.error(err);
//     ctx.internalServerError("An error occurred while fetching your passwords.");
//   }
// }
// }
// module.exports = {
// async findOne(ctx) {
//   const user = ctx.state.user;
//   const { id } = ctx.params;

//   if (!user) {
//     return ctx.unauthorized("You must be logged in to view a password.");
//   }

//   try {
//     const entry = await strapi.entityService.findOne('api::service-password.service-password', id, {
//       populate: ['user'],
//     });

//     if (!entry) {
//       return ctx.notFound("Password not found.");
//     }

//     if (entry.user?.id !== user.id) {
//       return ctx.forbidden("You are not allowed to access this password.");
//     }

//     ctx.send(entry);
//   } catch (err) {
//     console.error(err);
//     ctx.internalServerError("An error occurred while fetching the password.");
//   }
// }
// }

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { ForbiddenError, NotFoundError } = require('@strapi/utils').errors;

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

  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    const servicePassword = await strapi.entityService.findOne('api::service-password.service-password', id, {
      populate: { user: true },
    });

    if (!servicePassword) {
      throw new NotFoundError('Service password not found');
    }

    if (servicePassword.user.id !== user.id) {
      throw new ForbiddenError('You are not allowed to update this password');
    }

    const updatedEntry = await strapi.entityService.update('api::service-password.service-password', id, {
      data,
    });

    ctx.body = updatedEntry;
  },

  async delete(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    const servicePassword = await strapi.entityService.findOne('api::service-password.service-password', id, {
      populate: { user: true },
    });

    if (!servicePassword) {
      throw new NotFoundError('Service password not found');
    }

    if (servicePassword.user.id !== user.id) {
      throw new ForbiddenError('You are not allowed to delete this password');
    }

    const deletedEntry = await strapi.entityService.delete('api::service-password.service-password', id);

    ctx.body = deletedEntry;
  },

  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to create a password.");
    }

    try {
      const { title, value } = ctx.request.body.data;

      if (!title || !value) {
        return ctx.badRequest("Title and value are required.");
      }

      const entry = await strapi.entityService.create('api::service-password.service-password', {
        data: {
          title,
          value,
          user: user.id,
        },
      });

      ctx.send(entry);
    } catch (err) {
      console.error(err);
      ctx.internalServerError("An error occurred while creating the password.");
    }
  },

  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to view your passwords.");
    }

    try {
      const entries = await strapi.entityService.findMany('api::service-password.service-password', {
        filters: {
          user: user.id,
        },
      });

      ctx.send(entries);
    } catch (err) {
      console.error(err);
      ctx.internalServerError("An error occurred while fetching your passwords.");
    }
  },

  async findOne(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    if (!user) {
      return ctx.unauthorized("You must be logged in to view a password.");
    }

    try {
      const entry = await strapi.entityService.findOne('api::service-password.service-password', id, {
        populate: ['user'],
      });

      if (!entry) {
        return ctx.notFound("Password not found.");
      }

      if (entry.user?.id !== user.id) {
        return ctx.forbidden("You are not allowed to access this password.");
      }

      ctx.send(entry);
    } catch (err) {
      console.error(err);
      ctx.internalServerError("An error occurred while fetching the password.");
    }
  },
}));
