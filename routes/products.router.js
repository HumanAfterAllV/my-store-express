const express = require("express");
const {faker} = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
    const products = [];
    const { size } = req.query;
    const limit = size || 10;
    for(let index = 0; index < limit; index++)
        {
            products.push({
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
            });
        }
    res.json(products);
});

router.get('/filter', (req, res) => {
    res.send("Filter products");
});

router.get('/:id', (req, res) => {
    const { id, name } = req.params;
    res.json({
        id, 
        name: "Web Development",
        description: "Web development is the work involved in developing a Web site for the Internet (World Wide Web) or an intranet (a private network)."
    })
});

router.post('/', (req, res) => {
    const body = req.body;
    res.json({
        message: "Created",
        data: body
    });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
        message: "Created",
        data: body,
        id: id,
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: "Deleted",
        id: id,
    });
});

module.exports = router;