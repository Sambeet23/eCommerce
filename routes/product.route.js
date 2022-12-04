/**
 * This file will have routing reuests to the correct controller method
 */

const productController = require('../controllers/product.controller')
const { requestValidator, authJwt } = require('../middlewares')


module.exports = function (app) {
    //Route for creating a new product
    app.post('/ecomm/api/v1/products', [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin], productController.create)

    //Route for getting all products
    app.get('/ecomm/api/v1/products', productController.findAll)

    //Route for products based on id
    app.get('/ecomm/api/v1/products/:id', productController.findOne)

    //Route for updating products
    app.put('/ecomm/api/v1/products/:id', [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin], productController.update)

    //Route for deleting products
    app.delete('/ecomm/api/v1/products/:id', [authJwt.verifyToken, authJwt.isAdmin], productController.delete)

    //Support query parameters
    /**
     *    /ecomm/api/v1/products?name=i12 //i12 = iphone 12
     */
}