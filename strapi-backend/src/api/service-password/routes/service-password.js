'use strict';

module.exports = {
  routes: [
    // گرفتن همه رمزهای کاربر (محدود به خودش از طریق controller فیلتر میشه)
    {
      method: 'GET',
      path: '/service-passwords',
      handler: 'service-password.find',
    },
    // گرفتن یک رمز خاص فقط در صورتی که برای خود کاربر باشه
    {
      method: 'GET',
      path: '/service-passwords/:id',
      handler: 'service-password.findOne',
      config: {
        policies: [
          {
            name: 'global::is-owner',
            config: {
              model: 'api::service-password.service-password',
            },
          },
        ],
      },
    },
    // ایجاد رمز جدید (مالکیت پیش‌فرض کاربر لاگین‌شده هست)
    {
      method: 'POST',
      path: '/service-passwords',
      handler: 'service-password.create',
    },
    // ویرایش رمز — فقط اگر متعلق به خود کاربر باشه
    {
      method: 'PUT',
      path: '/service-passwords/:id',
      handler: 'service-password.update',
      config: {
        policies: [
          {
            name: 'global::is-owner',
            config: {
              model: 'api::service-password.service-password',
            },
          },
        ],
      },
    },
    // حذف رمز — فقط اگر متعلق به خود کاربر باشه
    {
      method: 'DELETE',
      path: '/service-passwords/:id',
      handler: 'service-password.delete',
      config: {
        policies: [
          {
            name: 'global::is-owner',
            config: {
              model: 'api::service-password.service-password',
            },
          },
        ],
      },
    },
  ],
};
