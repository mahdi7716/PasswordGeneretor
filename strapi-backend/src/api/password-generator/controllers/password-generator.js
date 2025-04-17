'use strict';

module.exports = {
  async generate(ctx) {
    const {
      length = 12,
      uppercase = true,
      lowercase = true,
      numbers = true,
      symbols = false
    } = ctx.request.body;

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const num = '0123456789';
    const sym = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (uppercase) charset += upper;
    if (lowercase) charset += lower;
    if (numbers) charset += num;
    if (symbols) charset += sym;

    if (charset.length === 0) {
      return ctx.badRequest('حداقل یک نوع کاراکتر باید انتخاب شود.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * charset.length);
      password += charset[rand];
    }

    ctx.send({ password });
  },
};
