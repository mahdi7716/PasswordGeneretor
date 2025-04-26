'use strict';

module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    return await next();
  }

  return ctx.unauthorized('You must be logged in to access this route');
};
