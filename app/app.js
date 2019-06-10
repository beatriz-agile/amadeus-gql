'use strict';

const framework = require('itaas-nodejs-api-framework');
const config = require('./config')();

const AmadeusService = require('./services/amadeus-service');
const HealthCheckActionV1 = require('./actions/v1/health-check-action');

let apiOptions = {
  name: 'Amadeus GraphQL',
  logLevels: config.logLevels,
  logOutput: config.logOutput,
  logDirectory: config.logDirectory
};

let api = framework(apiOptions);

setupServices();
setupRoutesV1(api);

api.listen(config.port);

function setupServices() {
  api.shared.set('amadeusService', new AmadeusService(config.amadeusUrl));
}

function setupRoutesV1(api) {
  api.get('/', [HealthCheckActionV1.getHome]);
  api.get('/v1/serviceStatus', [HealthCheckActionV1.getServiceStatus]);
}
