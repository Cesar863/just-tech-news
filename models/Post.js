const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { destroy } = require('./User');

// create our post model
class Post extends Model {
    static upvote(body, models){
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            });
        });
    }
}
// create fields/columns for post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            Refernces: {
            model: 'user',
            key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        uderscored: true,
        modelName: 'post'
    }
);

module.exports = Post;