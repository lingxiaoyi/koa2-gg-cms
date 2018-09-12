//const moment = require('moment')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('article', {
        // 文章ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: 'id'
        },
        userId: {
            type: DataTypes.BIGINT,
            field: 'user_id',
            comment: '用户id'
        },
        // 文章标题
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'title'
        }, // 文章作者
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'author'
        }, // 文章内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        }, // 文章分类
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'category'
        },
        state: { //状态 1.草稿 2.发布
            type: DataTypes.INTEGER(2),
            defaultValue: 1 //默认值
        },
    }, {
        underscored: true,
        //timestamps: false,
        paranoid: true,
        freezeTableName: true, // 为 true 则表的名称和 model 相同
        charset: 'utf8'
    })
}
