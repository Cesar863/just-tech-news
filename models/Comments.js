const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}

Comment.init(
    {
        // columns will go here
        id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoInctrement: true,
        },

        comment_text: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'comment',
                key: "text"
            },
            validate: {
                len: [1]
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },

        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        userscore: true,
        modelName: 'comment'
    }
);

module.exports = Comment;