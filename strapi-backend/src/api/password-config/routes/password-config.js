'use strict';

module.exports = {
  routes: [
    // گرفتن همه تنظیمات رمز کاربر (در کنترلر فیلتر میشه)
    {
      method: 'GET',
      path: '/password-configs',
      handler: 'password-config.find',
    },
    // گرفتن یک تنظیم خاص فقط در صورتی که برای خود کاربر باشه
    {
      method: 'GET',
      path: '/password-configs/:id',
      handler: 'password-config.findOne',
      config: {
        policies: [
          {
            name: 'global::is-owner',
            config: {
              model: 'api::password-config.password-config',
            },
          },
        ],
      },
    },
    // ایجاد تنظیم جدید
    {
      method: 'POST',
      path: '/password-configs',
      handler: 'password-config.create',
    },
    // ویرایش تنظیمات — فقط اگر متعلق به خود کاربر باشه
    {
      method: 'PUT',
      path: '/password-configs/:id',
      handler: 'password-config.update',
      config: {
        policies: [
          {
            name: 'global::is-owner',
            config: {
              model: 'api::password-config.password-config',
            },
          },
        ],
      },
    },
    // حذف تنظیمات — فقط اگر متعلق به خود کاربر باشه
    {
      method: 'DELETE',
      path: '/password-configs/:id',
      handler: 'password-config.delete',
      config: {
        policies: [
          {
            name: 'global::is-owner',
            config: {
              model: 'api::password-config.password-config',
            },
          },
        ],
      },
    },
  ],
};
