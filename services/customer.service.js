const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const {models} = require('../libs/sequelize');


class CustomerService {
    constructor(){};


    async find(){
        const rta = await models.Customer.findAll({
            include: ['user']
        });
        return rta;
    };

    async findOne(id){
        const user = await models.Customer.findByPk(id);
        if(!user){
            throw boom.notFound('Customer not found');
        }
        return user;
    };

    async create(data){
        const hash = await bcrypt.hash(data.user.password, 10);
        const newData = {
            ...data,
            user: {
                ...data.user,
                password: hash
            }
        }
        const newCustomer = await models.Customer.create(newData, {
            include: ['user']
        });

        delete newCustomer.dataValues.user.dataValues.password;
        return newCustomer;
    };

    async update(id, newData){
        const user = await this.findById(id);
        const rta = await user.update(newData);
        return rta;
    };

    async delete(id){
        const user = await this.findById(id);
        await user.destroy();
        return {message: 'Customer deleted'};
    }
};

module.exports = CustomerService;