/**
 * This file will have routing reuests to the correct controller method
 */

const controller = require('../controllers/category.controller')
const { requestValidator, authJwt } = require('../middlewares')

/**
 * const  requestValidator  = require('../Middleware')
 * 
 * requestValidator represent the whole object {requestValidator}
 * 
 * { requestValidator } = require('../Middleware')
 * requestValidator is showing requestValidator the key of object
    
 * 
 */

module.exports = function (app) {

    //Route for creating new category
    app.post('/ecomm/api/v1/categories', [authJwt.verifyToken, authJwt.isAdmin
        , requestValidator.validateCategoryRequest], controller.create);

    //Route for getting all the categories
    app.get('/ecomm/api/v1/categories', controller.findAll);

    //Route for getting categories by id
    app.get('/ecomm/api/v1/categories/:id', controller.findOne)

    //Route for updating the category
    app.put('/ecomm/api/v1/categories/:id', [authJwt.verifyToken, authJwt.isAdmin, requestValidator.validateCategoryRequest], controller.update);

    //Route for getting category based on name - filter the result based on name
    // app.get('/ecomm/api/v1/categories?name= ',controller.findAll)

    //Route for deleting the category
    app.delete('/ecomm/api/v1/categories/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.delete)
}