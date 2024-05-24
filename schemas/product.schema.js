const joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const productIdSchema = joi.string().guid({ version: 'uuidv4' });
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10).strict();
const image = joi.string().uri();

const createProductSchema = joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
});

const updateProductSchema = joi.object({
    name: name,
    price: price,
    image: image
});

const getProductSchema = joi.object({
    id: productIdSchema.required(),
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema};