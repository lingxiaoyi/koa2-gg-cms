module.exports = function(sequelize, DataTypes) {
    return sequelize.define('article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: 'id'
        },
        pageType: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'page_type',
            comment: '页面类型' //首页详情页等
        },
        qid: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'qid' //渠道号 qid02374等
        },
        ggId: { //广告id或者链接
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'gg_id'
        }
    }, {
        underscored: true,
        //timestamps: false,
        paranoid: true,
        freezeTableName: true, // 为 true 则表的名称和 model 相同
        charset: 'utf8'
    })
}
