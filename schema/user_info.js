module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_info', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.BIGINT,
            field: 'user_id',
            comment: '用户id'
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        headImg: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'head_img',
            defaultValue: ''
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        }
    }, {
        underscored: true,
        //timestamps: false,
        paranoid: true,
        freezeTableName: true, // 为 true 则表的名称和 model 相同
        charset: 'utf8'
    })
}
