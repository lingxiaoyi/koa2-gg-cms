module.exports = function(sequelize, DataTypes) {
    return sequelize.define('role', {
        id: {
            type: DataTypes.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            comment: '角色Id'
        },
        roleName: {
            type: DataTypes.STRING,
            comment: '角色名',
            field: 'role_name',
        }
    }, {
        underscored: true,
        //timestamps: false,
        paranoid: true,
        freezeTableName: true,
        charset: 'utf8'
    })
}
