let log4js = require('log4js')
import log4js_config from './logConfig.json'
log4js.configure(log4js_config)

export const logger = log4js.getLogger('log_file')
export const logger_date = log4js.getLogger('log_date')
export const logger_http = log4js.connectLogger(log4js.getLogger('http', { level: 'auto' }))
