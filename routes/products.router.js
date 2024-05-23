const express = require('express');
const ProductServices = require('../services/product.service');

const router = express.Router();
const service = new ProductServices();

router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

router.get('/filter', (req, res) => {
    res.send("Filter products");
});

router.get('/:id', async (req, res) => {
    try {
        const { id, name } = req.params;
        const product = await service.findOne(id);
        res.json(product);
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });
    }

});

router.post('/', async (req, res) => {
    const body = req.body;
    const newProdcut = await service.create(body);
    res.status(201).json(newProdcut);
});

router.patch('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json(product);
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });
        }
});

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const rta = await service.delete(id);
        res.json(rta);
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});

module.exports = router;