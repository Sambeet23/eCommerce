/**
 * This file will have the DB related configs
 */

module.exports = {
    development: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "Sambeet23",
        DB: "ecom_db",
        dialect: "mysql",
        pool: {
            max: 5,  //Max connection possible at any time = 5 as peak load
            min: 0,
            acquire: 30000, // in ms - wait for 30000 ms before boarding a connection request
            idle: 10000
        }
    },
    test: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "Mohit@19",
        DB: "ecom_test_db",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acuire: 30000, //max time in ms that a pool will try to get connection before throwing error
            idle: 10000  // maximum time in ms that a connection can be idle before being released
        }
    },

}
