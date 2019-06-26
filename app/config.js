'use strict';

module.exports = () => {
  return {
    port: process.env.AMADEUS_GQL_PORT || 4000,
    amadeusUrl: process.env.AMADEUS_URL || 'http://amadeus.itaas.uuxservices.com',
    instanceId: process.env.AMADEUS_INSTANCE_ID || 22,
    credentials: {
      username: 'sobre_graphql',
      password: '123456'
    }
  };
};
