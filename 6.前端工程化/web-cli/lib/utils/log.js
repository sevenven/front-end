const log = require('npmlog');

const lOG_LEVERS = ['verbose', 'info', 'warn', 'error'];
log.level = lOG_LEVERS.indexOf(process.env.LOG_LEVEL) >= 0 ? process.env.LOG_LEVEL : 'info';

module.exports = log;