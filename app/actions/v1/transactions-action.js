'use strict';
const request = require('request');
const { amadeusUrl } = require('../../config')();

class TransactionsAction {
  static async getTransactions(request) {
    const instanceId = request.instanceId;
    const customerId = request.customerId;

    const transactionsResult = await getTransactionsFromAmadeus(instanceId, customerId);

    if (!transactionsResult.isSuccess) {
      return serviceError(serviceResult, response);
    }
    
    const body = transactionsResult.body;
    return body && body.result ? body.result : {};
  }
}

function getTransactionsFromAmadeus(instanceId, customerId) {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: `${amadeusUrl}/${instanceId}/v1/customers/${customerId}/transactions`,
      json: true
    }, (err, response, body) => {
      let serviceResponse =
        PaybackResponseHandler.createResponse(context, err, response, body);
      return resolve(serviceResponse);
    });
  });
}

module.exports = TransactionsAction;
