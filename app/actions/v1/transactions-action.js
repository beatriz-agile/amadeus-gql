'use strict';

class TransactionsAction {
  static async getTransactions(context) {
    const response = context.response();
    const amadeusService = context.shared.get('amadeusService');

    const transactionsResult = await amadeusService.getTransactionsByCustomer(context, parameters.instanceId,
      parameters.customerId, parameters.query, parameters.fields, parameters.offset, parameters.limit);

    if (!transactionsResult.isSuccess) {
      return serviceError(serviceResult, response);
    }
    
    const body = transactionsResult.body;
    const result = body && body.result ? body.result : {};
    return response.result(result).end();
  }
}

module.exports = TransactionsAction;
