/**
 * This file will contain the schema defination for the category resource
 * 
 * We would like to export this schema to be called from  other modules
 * 
 */


module.exports = (sequelize, Sequelize) => {

    const Category = sequelize.define('category', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        }

    })
    // {
    //     tableName: 'categories'

    //     /**
    // * This helps us to provie a custom name to the table
    // * If above is not provided, model name is converted into plural and set as the table name
    // * 
    // * If we want to just use the model name provided, we can provide the below option :
    // * 
    // * freezeTableName: true
    // */
    // })
    return Category;
}