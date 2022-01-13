const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPasssword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// create fields/columns for User model
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    }
}, 
{
    hooks:{
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
        },
        // set up breforeUpdate lidecycle 'hook' functionality
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;


// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// //create our user model
// class User extends Model {}

// //define table columns and configuration
// User.init(
//     {
//         // define an ID collumn
//         id: {
//             // use the special Seqelize datatypes object provide what type of data it is
//             type: DataTypes.INTEGER,

//             // this is the equivalen of SAL 'NOT NULL' option
//             allowNull: false,

//             // instruct that this is the PRIMARY KEY
//             primaryKey: true,

//             // turn on auto increment
//             autoIncrement: true
//         },

//         // define a username column
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },

//         // define an email column
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,

//             // there cannot be any duplicate email values in this table
//             unique:true,

//             // if allowNull us set to false we can run out data through validators before creating the table data
//             validate: {
//                 isEmail: true
//             }
//         },

//         // define a password column
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 // this means the password must be at least 4 characters long
//                 len:[4]
//             }
//         }
//     },
//     {
//         // TABLE COLUMNS DEFINITIONS GO HERE
//     },
//     {
//         // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

//         // pass in our imported seqelize connection (the direct connection to our database)
//         sequelize,

//         // dont automatically create createdAt/UpdatedAt timestamp fields 
//         timestamps: false,

//         //dont pluralize name of databse table
//         freezeTableName: true,

//         // use underscores instead of camel-casing 
//         underscored: true,

//         // make it so our model name stays lowercase in the database
//         modeName: 'user'
//     }
// );

// module.exports = User;