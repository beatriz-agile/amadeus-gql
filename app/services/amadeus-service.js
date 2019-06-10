'use strict';
const Service = require('./service');

class AmadeusService extends Service {
  async getServiceStatus() {
    const response = await this.get('/v1/serviceStatus');
    if (response.result.status === 'ALL_DEPENDENCIES_OK') {
      return true;
    }
    return false;
  }
}

module.exports = AmadeusService;