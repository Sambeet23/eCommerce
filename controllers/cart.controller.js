const db = require("../Models")
const Cart = db.cart;
const Product = db.product;

/**
 *Handler for creating the cart request 
 */
exports.create = (req, res) => {
    const cart = {
        userId: req.userId
    }

    //If the user has also provided the item ids while creating cart
    //const itemId = req.body.items
    Cart.create(cart).then(cart => {
        res.status(201).send(cart)
    }).catch(err => {
        res.status(500).send({
            message: "Some internal server error occured"
        })
    })
}

/**
 *Handler for updating a cart 
 
 PUT 127.0.0.1:8080/ecomm/api/v1/carts/1234
 */
exports.update = (req, res) => {
    //Figure out if the cart is present, which needs to be updated
    const cartId = req.params.id;

    Cart.findByPk(cartId).then(cart => {

        //Add the products passed in the request body to the cart

        var productIds = req.body.productIds;

        Product.findAll({
            where: {
                id: productIds
            }
        }).then(products => {
            if (!products) {
                res.status(400).send({
                    message: "Products trying to add dosen't exist"
                })
                return
            }

            //Set these products inside the cart
            cart.setProducts(products).then(() => {
                console.log("Successfully added to the cart")
                //Take care of the cost part
                var cost = 0;
                var productsSelected = [];
                cart.getProducts().then(cartProducts => {

                    for (let i = 0; i < cartProducts.length; i++) {



                        productsSelected.push({
                            id: cartProducts[i].id,
                            name: cartProducts[i].name,
                            cost: cartProducts[i].cost

                        })
                        cost = cost + cartProducts[i].cost

                    }
                    //I'm ready to return the cart update response
                    res.status(200).send({
                        id: cart.id,
                        productsSelected: productsSelected,
                        cost: cost

                    })
                })
            })


        }).catch(err => {
            res.status(500).send({
                message: "Error while updating the cart"
            })
        })


    })

}


/**
 * Search for a cart based on the cart id
 */
exports.getCart = (req, res) => {

    const cartId = req.params.cartId;

    Cart.findByPk(cartId).then(cart => {
        var cost = 0;
        var productsSelected = [];
        cart.getProducts().then(cartProducts => {

            for (let i = 0; i < cartProducts.length; i++) {

                productsSelected.push({
                    id: cartProducts[i].id,
                    name: cartProducts[i].name,
                    cost: cartProducts[i].cost
                })
                cost = cost + cartProducts[i].cost;
            }

            //I'm ready to return the cart update response
            res.status(200).send({
                id: cart.id,
                productsSelected: productsSelected,
                cost: cost

            })
        })
    })
}