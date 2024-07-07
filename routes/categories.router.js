const express = require('express');
const passport = require('passport');

const CategoryService = require('../services/category.service');
const validationHandler = require('../middlewares/validator.handler');
const { checkRoles } =  require('../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin', 'user', 'customer'), 
    async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    };
});

router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin', 'user', 'customer'), 
    validationHandler(getCategorySchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await service.findOne(id);
        res.json(category);
    } catch (error) {
        next(error);
    };
});

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin'),
    validationHandler(createCategorySchema, 'body'), async (req, res, next) => {
    try {
        const body = req.body;
        const newCategory = await service.create(body);
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    };
});

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin'), 
    validationHandler(getCategorySchema, 'params'), 
    validationHandler(updateCategorySchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedCategory = await service.update(id, body);
        res.json(updatedCategory);
    } catch (error) {
        next(error);
    };
});

router.delete('/:id',
    passport.authenticate('jwt', {session: false}), 
    checkRoles('admin'),
    validationHandler(getCategorySchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        await service.delete(id);
        res.status(201).json({id});
    } catch (error) {
        next(error);
    };
});

module.exports = router;
