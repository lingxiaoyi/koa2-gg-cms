//const moment = require('moment')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: { //邮箱
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, //唯一
            validate: {
                isEmail: true, // 检测邮箱格式 (foo@bar.com)
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        state: { //状态 0未激活邮箱.1已激活邮箱.2拉黑用户
            type: DataTypes.INTEGER(2),
            defaultValue: 0 //默认值
        },
        /*createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
            }
        }*/
    }, {
        underscored: true,
        //timestamps: false,
        //paranoid: true,
        freezeTableName: true, // 为 true 则表的名称和 model 相同
        charset: 'utf8'
    })
}
