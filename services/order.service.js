const {models} = require('../libs/sequelize');
/* const boom = require('@hapi/boom'); */
class OrderService {
    constructor(){

    };

    async create(data){
        const newOrder = await models.Order.create(data);
        return newOrder;
/*         const customer = await models.Customer.findOne({
            where: {
                '$user.id$': data.userId
            },
            include: ['user'],

        });
        if (!customer){
            throw boom.badRequest('Customer not found');
        }
        const newOrder = await models.Order.create({
            customerId: customer.id,
        });
        return newOrder; */
    };

    async addItem(data){
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    async findByUser (userId){
        const orders = await models.Order.findAll({
            where: {
            '$customer.user.id$': userId
            },
            include: {
                association: 'customer',
                include: ['user']
            },
        });
        return orders;
    }

    async find(){
        return [];
    };

    async findOne(id){
        const order = await models.Order.findByPk(id, {
            include: [
                {
                    association: 'customer',
                    include: ['user']
                },
                'items'
            ]
        });
        return order;
    };

    async update(id, newData){
        return{
            id,
            newData
        };
    };

    async delete(id){
        return {id};
    }
};

module.exports = OrderService;