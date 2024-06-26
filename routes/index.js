const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customer.router');
const categoriesRouter = require('./categories.router');
const ordersRouter = require('./orders.router');

function routerApi(app) {
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/products', productsRouter);

    router.use('/categories', categoriesRouter);

    router.use('/users', usersRouter);

    router.use('/orders', ordersRouter);

    router.use('/customers', customersRouter);

};

module.exports = routerApi;
