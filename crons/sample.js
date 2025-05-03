const SERVICE_NAME='sample-cron-job';
const BaseCron=require('./base-cron');
const useCases=require('../use-cases');


class SampleCron extends BaseCron {
  constructor() {
    super({serviceName: SERVICE_NAME});
  }

  async performJob({logger}) {
    // If your job requires to enqueue in Kafka then init it as below
    await this.initQueue();

    logger.info(useCases.greetWelcomeToApp(SERVICE_NAME));
  }
}

(async function() {
  const sampleCron = new SampleCron();
  await sampleCron.start();
})();
