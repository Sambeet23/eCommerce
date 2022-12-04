/**
 * This will expose the functionalities of all the model files defined under the models directory
 */

//Create the connection with the db
const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize')
const config = require('../configs/db.config.js')[env];

/**
 * creating the db connection
 */

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.acquire
        }
    }
)

/**
 * I need to expose the sequelize and category model
 */
var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model')(sequelize, Sequelize)
db.product = require('./product.model')(sequelize, Sequelize)
db.user = require("./user.model")(sequelize, Sequelize)
db.role = require("./role.model")(sequelize, Sequelize)
db.cart = require("./cart.model")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
    through: "users_roles",
    foreignKey: "role_id",
    otherKey: "user_id"
})

db.user.belongsToMany(db.role, {
    through: "users_roles",
    foreignKey: "user_id",
    otherKey: "role_id"
})

/**
 * Establish relation between 
 * 1. user and cart: One to Many
 * 2. Cart and the product
 */
db.user.hasMany(db.cart);

db.cart.belongsToMany(db.product, {
    through: "cart_products",
    foreignKey: "cart_id",
    otherKey: "product_id"
})

db.product.belongsToMany(db.cart, {
    through: "cart_products",
    foreignKey: "product_id",
    otherKey: "cart_id"
})

/**
 * List of valid roles
 */
db.ROLES = ["customer", "admin"];


module.exports = db;
