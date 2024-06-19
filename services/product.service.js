const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const {boom} = require('@hapi/boom');

//const pool = require('../libs/postgres.pool');
const sequelize = require('../libs/sequelize');

class ProductService {
    constructor() {
        this.products = [];
        this.generate();
/*         this.pool = pool;
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)}) */
    }

    async generate() {
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
    }

    async create(data) {
        const newProduct = {
            id: uuidv4(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async find() {
/*         const query = 'SELECT * FROM taks';
        const rta = await this.pool.query(query);
        return rta.rows; */

        const query = 'SELECT * FROM taks';
        const [data] = await sequelize.query(query);
        return data;
/*         return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 2000)
        }) */
    }

    async findOne(id) {
        const index = this.products.findIndex((item) => item.id === id);
        if ( !index) {
            throw boom.notFound('Product not found');
        }
        if ( index.isBlock){
            throw boom.conflict('Product is blocked');
        }
        return this.products[index];
    }

    async update(id, changes) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        this.products.splice(index, 1);
        return { id }
    }
}

module.exports = ProductService;
