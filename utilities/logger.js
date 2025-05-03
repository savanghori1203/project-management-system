const winston = require('winston');
const { combine, timestamp, json, prettyPrint, errors } = winston.format;

class Logger {
    constructor(loggingOptions) {
        this.logger = this.createLogger(loggingOptions);
    }

    createLogger(loggingOptions) {
        const transports = [];
        const env = process.env.NODE_ENV || 'development';
        const isProduction = env !== 'development';

        if (loggingOptions.console && loggingOptions.console.enabled) {
            transports.push(
                new winston.transports.Console({
                    level: loggingOptions.console.level || 'debug',
                    format: isProduction ? json() : prettyPrint()
                })
            );
        }

        if (loggingOptions.file && loggingOptions.file.enabled) {
            const logFilePath = process.env.LOG_FILE_PATH || 'app.log';
            transports.push(
                new winston.transports.File({
                    filename: logFilePath,
                    level: loggingOptions.file.level || 'info',
                    format: json()
                })
            );
        }

        return winston.createLogger({
            level: 'debug',
            format: combine(errors({ stack: true }), timestamp(), json()),
            transports
        });
    }

    log(level, message, ...meta) {
        this.logger.log(level, message, ...meta);
    }

    debug(message, ...meta) {
        this.log('debug', message, ...meta);
    }

    info(message, ...meta) {
        this.log('info', message, ...meta);
    }

    warn(message, ...meta) {
        this.log('warn', message, ...meta);
    }

    error(message, ...meta) {
        this.log('error', message, ...meta);
    }
}

module.exports = Logger
