'use strict';

const framework = require('itaas-nodejs-api-framework');
const config = require('./config')();

const HealthCheckActionV1 = require('./actions/v1/health-check-action');
let healthCheckAction;

let apiOptions = {
  name: 'Amadeus GraphQL',
  logLevels: config.logLevels,
  logOutput: config.logOutput,
  logDirectory: config.logDirectory
};

let api = framework(apiOptions);

setupServices();
setupRoutesV1(api);

function setupServices() {
  healthCheckAction = new HealthCheckActionV1(new AmadeusService(config.amadeusUrl));
}

function setupRoutesV1(api) {
  api.get('/', [healthCheckAction.getHome]);
  api.get('/v1/serviceStatus', [healthCheckAction.getServiceStatus]);
}
