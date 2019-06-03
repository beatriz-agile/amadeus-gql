'use strict';

class AmadeusService {
  constructor(url) {
    this.url = url;
  }

  getServiceStatus() {
    return true;
  }
}

module.exports = AmadeusService;