const joi = require('joi');
/* const { v4: uuidv4 } = require('uuid');
 */
/* const id = joi.string().guid({ version: 'uuidv4' }) */;
const id = joi.number().integer();
const categoryId = joi.number().integer();
const name = joi.string().min(3).max(50);
const price = joi.number().integer().min(10);
const description = joi.string().min(10);
const image = joi.string().uri();

const limit = joi.number().integer();
const offset = joi.number().integer();

const price_min = joi.number().integer();
const price_max = joi.number().integer();

const createProductSchema = joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(), 
    image: image.required(),
    categoryId: categoryId.required()
});

const updateProductSchema = joi.object({
    name: name,
    price: price,
    image: image,
    description: description,
    categoryId
});

const getProductSchema = joi.object({
    id: id.required(),
});

const queryProductSchema = joi.object({
    limit,
    offset,
    price,
    price_min,
    price_max: price_max.when('price_min', {
        is: joi.number().integer().required(),
        then: joi.required()
    })
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema};