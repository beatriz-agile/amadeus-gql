'use strict';
const request = require('request');
const { amadeusUrl, instanceId, credentials } = require('../../config')();

class TransactionsAction {
  static async getTransactions(request) {
    const customerId = request.customerId;

    const token = await getToken();

    return await getTransactionsFromAmadeus(token, customerId);
  }
}

function getToken() {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: `${amadeusUrl}/${instanceId}/v1/auth/accessToken`,
      qs: { login: credentials.username, password: credentials.password },
      json: true
    }, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      if (!body || !body.result || !body.result.token) {
        return reject(response);
      }
      return resolve(body.result.token);
    });
  });
}

function getTransactionsFromAmadeus(token, customerId) {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: `${amadeusUrl}/${instanceId}/v1/customers/${customerId}/transactions`,
      qs: { token },
      json: true
    }, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      if (!body || !body.result || !body.result.transactions) {
        return reject(response);
      }
      return resolve(body.result.transactions);
    });
  });
}

module.exports = TransactionsAction;
