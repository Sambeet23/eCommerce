/**
 * It will hold the schema for cart
 */
module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cost: {
            type: Sequelize.INTEGER
        }
    })
    return Cart;
}