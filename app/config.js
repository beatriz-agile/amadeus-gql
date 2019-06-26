'use strict';

module.exports = () => {
  return {
    port: process.env.AMADEUS_GQL_PORT || 4000,
    amadeusUrl: process.env.AMADEUS_URL || 'http://amadeus.itaas.uuxservices.com'
  };
};
