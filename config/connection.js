const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;



// // import sequelize constructor from library
// const Sequelize = require('sequelize');

// require('dotenv').config();

// // create connection to our database, pass in your MySQL information for username and password
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.BD_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
// });

// module.exports = sequelize;