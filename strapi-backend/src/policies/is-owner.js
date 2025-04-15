// آیا این داده برای خود کاربره؟

// اگه نه → ارور 403 Forbidden

module.exports = async (ctx, config, { strapi }) => {
    const { id } = ctx.params;
    const user = ctx.state.user;
  
    if (!user) {
      return ctx.unauthorized("کاربر یافت نشد.");
    }
  
    const [modelUid, modelName] = config.model.split("::");
    
    const entry = await strapi.entityService.findOne(config.model, id, {
      populate: ["user"],
    });
  
    if (!entry || entry.user.id !== user.id) {
      return ctx.unauthorized("شما اجازه دسترسی به این داده را ندارید.");
    }
  
    return true;
  };