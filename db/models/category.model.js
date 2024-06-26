const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = "categories";

const CategorySchema = {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createAd:{
        type: DataTypes.DATE, 
        field: 'create_at',
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
};

class Category extends Model {
    static associate(models){
        this.hasMany(models.Product, {
            foreignKey: 'categoryId', 
            as: 'products'
        });
    };

    static config(sequelize){
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        };
    };
};

module.exports = { Category, CategorySchema, CATEGORY_TABLE };