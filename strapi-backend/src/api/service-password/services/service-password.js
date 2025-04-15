'use strict';

/**
 * service-password service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service-password.service-password');
