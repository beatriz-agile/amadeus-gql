'use strict';

module.exports = () => {
  return {
    port: process.env.AMADEUS_GQL_PORT || 8086,
    logOutput: process.env.AMADEUS_GQL_LOG_OUTPUT || 'rotating-file', //rotating-file|cloudwatch
    logDirectory: process.env.AMADEUS_GQL_LOG_FILE_DIRECTORY || './logs',
    logLevels: splitValues(process.env.AMADEUS_GQL_LOG_LEVELS || 'fatal,error,warn,info,debug,trace'),

    amadeusUrl: process.env.AMADEUS_URL || 'http://amadeus.itaas.uuxservices.com'
  };
};

function splitValues(toBeSplited) {
  if (!toBeSplited) {
    return [];
  }
  return toBeSplited.split(',');
}
