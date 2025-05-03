const config = require('./backend-config');
const _ = require('lodash');
const serviceConfiguration = require('./service-configuration');
if (serviceConfiguration.kafkaTopics) {
  config.kafka.topics = serviceConfiguration.kafkaTopics;
}
if (serviceConfiguration.cockroach) {
  config.cockroach = _.assign(config.cockroach, serviceConfiguration.cockroach);
  delete serviceConfiguration.cockroach;
}
module.exports = _.assign(config, serviceConfiguration);
