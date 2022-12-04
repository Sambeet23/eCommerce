/**
 * It will have schema for products
 * 
 * Product:
 *   id
 *   name
 *   description
 *   cost
 * 
 * I need to define the schema and export it to the external files
 */


module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
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
        },
        cost: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    })
    return Product
}

