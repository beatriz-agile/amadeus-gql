'use strict';

const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const config = require('./config')();
const TransactionsAction = require('./actions/v1/transactions-action');

const schema = buildSchema(`
    type Query {
      transactions(customerId: String!): [Transaction]
    },
    type Transaction {
      id: String,
      status: String,
      statusDetails: String,
      methodName: String,
      instanceId: String,
      customerId: String,
      description: String,
      products: [Product],
      fee: String,
      tax: String,
      total: String,
      currency: String
    },
    type Product {
      externalId: String,
      name: String,
      description: String,
      quantity: String,
      unitPrice: String,
      unitTax: String
    }
`);

const root = {
  transactions: TransactionsAction.getTransactions
};

const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(config.port, () => console.log(`Express GraphQL Server Now Running On localhost:${config.port}/graphql`));
