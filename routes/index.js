const express = require('express');

const productsRouter = require('./products.router');
const aboutRouter = require('./about.router');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/products', productsRouter);
    router.use('/about', aboutRouter);
    router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
