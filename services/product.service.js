/* const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid'); */
const {boom} = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const {Op} = require('sequelize');


class ProductService {
    constructor() {
        this.products = [];
        //Generar products
/*         this.generate();
 *//*         this.pool = pool;
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)}) */
    }

/*     async generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: uuidv4(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            });
        }
    } */

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async find(query) {
        const options = {
            include: ['category'],
            where: {}
        }
        
        const {limit, offset} = query;
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        const {price} = query;
        if (price){
            options.where.price = price;
        }
        const {price_min,price_max} = query;
        if(price_min && price_max){
            options.where.price={
                [Op.gte]:price_min,
                [Op.lte]:price_max,
            };
        }

        const products = await models.Product.findAll(options);
        return products;
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('Product not found');
        }
        return product;
/*         const index = this.products.findIndex((item) => item.id === id);
        if ( !index) {
            throw boom.notFound('Product not found');
        }
        if ( index.isBlock){
            throw boom.conflict('Product is blocked');
        }
        return this.products[index]; */
    }

    async update(id, newData) {
        const product = await this.findOne(id);
        const rta = await product.update(newData);
        return rta;
/*         const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index]; */
    }

    async delete(id) {
        const product = await this.findOne(id);
        await product.destroy();
        return {message: 'Product deleted'};
/*         const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        this.products.splice(index, 1);
        return { id } */
    }
}

module.exports = ProductService;
