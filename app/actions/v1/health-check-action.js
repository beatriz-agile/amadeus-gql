'use strict';
const version = require('../../../package').version;

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
  static getHome(context) {
    let response = context.response();
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    return response.result({ version, quote }).end();
  }

  static async getServiceStatus(context) {
    let response = context.response();
    const amadeusService = context.shared.get('amadeusService');
    
    const serviceResult = await amadeusService.getServiceStatus();

    let responseStatus = 'NOT_ALL_DEPENDENCIES_OK';

    if (serviceResult === true) {
      responseStatus = 'ALL_DEPENDENCIES_OK';
    }

    let apisResult = {
      status: responseStatus,
      serviceConnections: {
        amadeus: serviceResult,
      }
    };

    return response.result(apisResult).end();
  }
}

module.exports = HealthCheckAction;
