const {boom} = require('@hapi/boom');

/* const getConnection = require('../libs/postgres'); */
const { models } = require('../libs/sequelize');
const { use } = require('react');

class UserService {
    constructor() {
/*         this.pool = pool;
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
        }) */
    };

    async create(data) {
        const newUser = await models.User.create(data);
        return newUser;
    };

    async find(){
        const rta = await models.User.findAll({
            include: ['customer']
        });
        
        return rta;    
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found');
        }
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const rta = user.update(changes);
        return rta; 
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return{ id: true };
    }

    async block(id) {
        return id;
    }
};

module.exports = UserService;