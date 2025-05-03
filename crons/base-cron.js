const config = require('../config');
const Logger = require('../utilities/logger');
const logger = new Logger(config.loggingOptions);

class BaseCron {
    constructor({ serviceName }) {
        this.serviceName = serviceName;
        this.logger = logger;

        process.on('SIGINT', this.handleExit.bind(this)); // for ctr+c
        process.on('uncaughtException', this.handleExit.bind(this)); //for  any other error
    }

    //handle singlan which get from application whcih is running
    handleExit(error) {
        if (error) {
            this.logger.error(`[${this.serviceName}] Uncaught error:`, error);
        } else {
            this.logger.info(`[${this.serviceName}] Received exit signal.`);
        }
        process.exit(1);
    }

    async start() {
        this.logger.info(`[${this.serviceName}] Cron job started.`);
        try {
            await this.performJob();
            this.logger.info(`[${this.serviceName}] Cron job completed.`);
        } catch (error) {
            this.logger.error(`[${this.serviceName}] Error in cron execution:`, error);
        }
    }

    async performJob() {
        this.logger.error(`[${this.serviceName}] Please override performJob() in your subclass.`);
        throw new Error('performJob() must be implemented in the child class.');
    }
}

module.exports = BaseCron;
