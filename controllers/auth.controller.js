/**
 * It will be used for authentication and authorization
 */

const bcrypt = require("bcryptjs");
const { Sequelize } = require("../Models");
const db = require("../Models")

const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

const jwt = require("jsonwebtoken")
const secretKey = require("../configs/secret.config")


/**
 * Handler for signup
 */
exports.signup = (req, res) => {
    //Read the req body and create user object
    console.log(req.body.username);
    console.log(req.body);
    console.log(req.password);
    const userObj = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8) // need to encrypt this
    }

    //Persist this user object to the DB
    User.create(userObj).then(user => {
        console.log("user created")

        //I also need to provide correct roles to this user
        if (req.body.roles) {
            //I need to first have the roles created in the system

            //I need to check if the desired roles match with the supported roles
            Role.findAll({
                where: {
                    name: {
                        //where name = "1" or name = "2" or name = "3"
                        [Op.or]: req.body.roles //array of roles
                    }
                }
            }).then(roles => {
                //Set these roles with user
                user.setRoles(roles).then(() => {
                    console.log("registration is completed")
                    res.status(201).send({
                        message: "User successfully registered"
                    })
                })
            })
        } else {
            /** 
            //One option that I fetch the Role Object by running the query
            Role.findOne({
                where: {
                    name: 'customer'
                }
            }).then(roles => {
                User.setRoles([role]).then(() => {
                    console.log("registration is completed")
                    res.status(201).send({
                        message: "User successfully registered"
                    })
                })
            }) 
            **/

            user.setRoles([1]).then(() => {
                console.log("registration is completed")
                res.status(201).send({
                    message: "User successfully registered"
                })
            })
        }
    }).catch(err => {
        console.log("Error while creating user", err.message)
        res.status(500).send({
            message: "Some internal server error"
        })
    })
}

/**
 * Handler for signin
 */
exports.signin = (req, res) => {
    //Check if the user exist?

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            res.status(404).send({
                message: "User not found"
            })
            return;
        }
        //Verify the password
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            res.status(401).send({
                message: "Invalid password"
            })
        }

        /**
         * I need to generate the access token using jwt
         */
        var token = jwt.sign({ id: user.id }, secretKey.secret, {
            expiresIn: 300 // This again we could have kept in the config file
        })
        /**
         * I want to provide the roles assigned to the user in the response
         */
        var authorities = []
        user.getRoles().then(roles => {

            for (i = 0; i < roles.length; i++) {
                authorities.push("ROLES_" + roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accesstoken: token
            })
        })



    }).catch(err => {
        res.status(500).send({
            message: "Internal error while signin"
        })
    })
}
