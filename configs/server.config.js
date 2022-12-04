if (process.env.NODE_ENV !== 'production') {
    //Try to read the values as environment param from .env file
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT
}