const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const img = joi.string().uri();

const createCategorySchema = joi.object({
    name: name.required(),
    img: img.required()
});

const updateCategorySchema = joi.object({
    name: name,
    img: img
});

const getCategorySchema = joi.object({
    id: id.required()
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };