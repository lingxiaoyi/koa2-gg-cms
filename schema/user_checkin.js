module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_checkin', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        loginIp: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            field: 'login_ip',
            validate: {isIP: true},
            comment: '登录IP'
        },
        userId: {
            type: DataTypes.BIGINT,
            field: 'user_id',
            comment: '用户id'
        },
    }, {
        underscored: true,
        //timestamps: false,
        paranoid: true,
        freezeTableName: true, // 为 true 则表的名称和 model 相同
        charset: 'utf8'
    })
}
