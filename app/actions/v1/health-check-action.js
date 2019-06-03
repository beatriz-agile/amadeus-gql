'use strict';
const version = require('../../../package').version;
const promiseAwaiter = require('../../../app/utils/promises/promise-awaiter');

const quotes = [
  'Antonio Salieri: Mediocrities everywhere... I absolve you... I absolve you... '
  + 'I absolve you... I absolve you... I absolve you all.',
  'Father Vogler: It makes no difference. All men are equal in God\'s eyes. Antonio Salieri: Are they?',
  'Mozart: Forgive me, Majesty. I am a vulgar man! But I assure you, my music is not.',
  'Constanze Mozart: Wolfie, I think you really are going mad.',
  'Mozart: In a play if more than one person speaks at the same time, it\'s just noise, [...]. '
  + 'But with opera, [...] with music you can have twenty individuals all talking at the same time, '
  + 'and it\'s not noise, it\'s a perfect harmony!',
  'Antonio Salieri: The restored third act was bold, brilliant. The fourth... was astounding.',
  'Emanuel Schikaneder: She\'s mad, Wolfie. Write it down please.'
];

class HealthCheckAction {
  constructor(amadeusService) {
    this.amadeusService = amadeusService;
  }

  getHome(context) {
    let response = context.response();
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    return response.result({ version, quote }).end();
  }

  getServiceStatus(context) {
    let response = context.response();

    let config = context.shared.get('config');

    let serviceStatusChecks = [
      isServiceAvailable(context, godfatherService),
      isServiceAvailable(context, startrekService),
      isServiceAvailable(context, contentService),
      isServiceAvailable(context, swordfishService),
      isServiceAvailable(context, paybackService),
      isServiceAvailable(context, voucherService),
      isServiceAvailable(context, wallstreetService),
      isServiceAvailable(context, emailVerificationService)
    ];

    return Promise.all(serviceStatusChecks)
      .then((serviceStatuses) => {
        let responseStatus;

        if (serviceStatuses.every(status => status === true)) {
          responseStatus = 'ALL_DEPENDENCIES_OK';
        }
        else {
          responseStatus = 'NOT_ALL_DEPENDENCIES_OK';

          context.logger.debug({
            contentUrl: config.contentUrl,
            godfatherUrl: config.godfatherUrl,
            startrekUrl: config.startrekUrl,
            swordfishUrl: config.swordfishUrl,
            paybackUrl: config.paybackUrl,
            voucherUrl: config.voucherUrl,
            wallstreetUrl: config.wallstreetUrl,
            emailVerificationUrl: config.emailVerificationUrl
          });
        }

        let apisResult = {
          status: responseStatus,
          serviceConnections: {
            godfather: serviceStatuses[0],
            startrek: serviceStatuses[1],
            content: serviceStatuses[2],
            swordfish: serviceStatuses[3],
            payback: serviceStatuses[4],
            voucher: serviceStatuses[5],
            wallstreet: serviceStatuses[6],
            emailVerification: serviceStatuses[7]
          }
        };

        // This log is important for monitoring reasons 
        context.logger.warn(apisResult);

        return response
          .result(apisResult)
          .end();
      });
  }
}

function isServiceAvailable(context, service) {
  let timeout = context.shared.get('config').dependencyTimeoutMilliseconds;

  return promiseAwaiter.wait(service.getServiceStatus(context), timeout)
    .then((awaitedStatusCheck) => {
      if (awaitedStatusCheck.finished) {
        let serviceResponse = awaitedStatusCheck.value;
        return serviceResponse && serviceResponse.isSuccess;
      }
      return false;
    });
}

module.exports = HealthCheckAction;
