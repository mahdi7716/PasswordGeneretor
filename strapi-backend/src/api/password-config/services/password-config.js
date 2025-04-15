'use strict';

/**
 * password-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::password-config.password-config');
