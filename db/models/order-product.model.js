/* const {Model, DataTypes, Sequelize} = require('sequelize');
const {ORDER_TABLE} = require('./order.model');
const {PRODUCT_TABLE} = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    createAt:{
        type: DataTypes.DATE,
        field: 'create_at',
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderId:{
        type: DataTypes.INTEGER,
        field: 'order_id',
        allowNull: false,
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productId:{
        type: DataTypes.INTEGER,
        field: 'product_id',
        allowNull: false,
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class OrderProduct extends Model {
    static associate(models){

    };
    static config(sequelize){
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        };
    };
};

module.exports = {OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE}; */