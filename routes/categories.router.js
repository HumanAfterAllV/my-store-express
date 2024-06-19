const express = require('express');
const CategoryService = require('../services/category.service');
const validationHandler = require('../middlewares/validationHandler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    };
});

router.get('/:id', validationHandler(getCategorySchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await service.findById(id);
        res.json(category);
    } catch (error) {
        next(error);
    };
});

router.post('/', validationHandler(createCategorySchema), async (req, res, next) => {
    try {
        const body = req.body;
        const newCategory = await service.create(body);
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    };
});

router.put('/:id', validationHandler(getCategorySchema, 'params'), validationHandler(updateCategorySchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedCategory = await service.update(id, body);
        res.json(updatedCategory);
    } catch (error) {
        next(error);
    };
});

router.delete('/:id', validationHandler(getCategorySchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        await service.delete(id);
        res.status(201).json({id});
    } catch (error) {
        next(error);
    };
});

module.exports = router;
