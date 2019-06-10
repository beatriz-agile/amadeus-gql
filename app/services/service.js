'use strict';
const request = require('request-promise');

class Service {
  constructor(url) {
    this.url = url;
  }

  async get(route) {
    let result = await request(`${this.url}${route}`);
    return JSON.parse(result);
  }
}

module.exports = Service;
