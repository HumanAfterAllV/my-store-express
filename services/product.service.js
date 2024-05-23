const { faker } = require('@faker-js/faker');
const e = require('express');
const { resolve } = require('styled-jsx/css');
const { v4: uuidv4 } = require('uuid');

class ProductService {
    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: uuidv4(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
            });
        }
    }

    create(data) {
        const newProduct = {
            id: uuidv4(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 2000)
        })
    }

    findOne(id) {
        const index = this.products.findIndex((item) => item.id === id);
        if ( index === -1) {
            throw new Error('Product not found');
        }
        else {
            return this.products[index];
        }
    }

    update(id, changes) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index];
    }

    delete(id) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products.splice(index, 1);
        return { id }
    }
}

module.exports = ProductService;

module.exports = ProductService;
