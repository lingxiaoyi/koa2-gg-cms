const db = require('../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../schema/user.js')
const UserInfo = Sequelize.import('../schema/user_info.js')
const UserCheckin = Sequelize.import('../schema/user_checkin.js')
const Role = Sequelize.import('../schema/role.js')
const Article = Sequelize.import('../schema/article.js')
const sequelize = require('sequelize')
const UserRoles = Sequelize.define('user_roles', {
    userId: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        field: 'user_id',
        primaryKey: true
    },
    roleId: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        field: 'role_id',
        primaryKey: true
    }
}, {
    underscored: true,
    //timestamps: false,
    //paranoid: true,
    freezeTableName: true, // 为 true 则表的名称和 model 相同
    charset: 'utf8'
})
Sequelize.sync({force: false})
//关联数据库关系
User.hasOne(UserCheckin, {foreignKey: 'userId', targetKey: 'id'})
UserCheckin.belongsTo(User)
User.hasOne(UserInfo, {foreignKey: 'userId', targetKey: 'id'})
UserInfo.belongsTo(User)
User.belongsToMany(Role, {
    through: 'user_roles',
    as: 'UserRoles'
})
Role.belongsToMany(User, {
    through: 'user_roles',
    as: 'UserRoles'
})
User.hasMany(Article, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'Article'
})
Article.belongsTo(User)
class UserModel {
    //创建用户
    static async create(user) {
        try {
            let [userData, userInfo, userCheckin] = await Promise.all([
                User.create(user),
                UserInfo.create({nickname: user.nickname, headImg: user.headImg}),
                UserCheckin.create({loginIp: user.loginIp})
            ])
            userData.setUser_checkin(userCheckin)
            userData.setUser_info(userInfo)
            return userData
        } catch (e) {
            await User.destroy({
                where: {
                    email: user.email
                }
            })
            return false
        }
    }
    //拉黑用户
    static async blackUser(id) {
        let data = await User.findOne({
            where: {
                id
            }
        })
        return data.update({state: 2})
    }
    //查询email是否注册
    static async hasEmail(email) {
        let data = await User.findOne({
            where: {
                email
            }
        })
        return !!data
    }
    //查询用户是否拉黑
    static async findUser(id) {
        let data = await User.findOne({
            where: {
                id
            }
        })
        return data
    }
    //查询用户信息
    static async findUserInfo(email) {
        return User.findOne({
            where: {
                email
            },
            include: [
                {
                    model: UserInfo
                },
            ]
        })
    }
    //更新用户IP信息
    static async updateLoginIp(userId, ip) {
        let data = await UserCheckin.findOne({
            where: {
                userId
            }
        })
        return data.update({loginIp: ip})
    }

    //创建用户角色
    static async createRole(roles) {
        for (let item of roles.split(',')) {
            let data = await Role.findOne({
                where: {
                    roleName: item
                }
            })
            if (!data) {
                await Role.create({roleName: item})
            }
        }
    }
    //用户角色关系表创建数据
    static async createUserRole(id, roleid) {
        return UserRoles.create({
            userId: id,
            roleId: roleid
        })
    }
    //获取用户角色列表
    static async getUserRole(id) {
        let user = await User.findById(id, {
            include: [{
                model: Role,
                as: 'UserRoles'
            }]
        })
        return user
    }
}
class ArticleModel {
    //创建文章
    static async createArticle(data) {
        return Article.create({
            title: data.title,
            author: data.author,
            content: data.content,
            category: data.category,
            userId: data.userId
        })
    }
    //获取用户文章列表
    static async getUserArticleList(id) {
        let user = await User.findById(id,
            {
                include: [
                    {
                        model: Article,
                        as: 'Article'
                    },
                ]
            })
        return user.Article
    }
    //更新文章数据
    static async updateArticle(data) {
        let user = await User.findById(data.userId, //用户id
            {
                include: [
                    {
                        model: Article,
                        as: 'Article',
                        where: {
                            id: data.id //文章id
                        }
                    },
                ]
            })
        if (!user) {
            return '更新失败,找不到此文章' //找不到文章
        } else {
            try {
                await user.Article[0].updateAttributes(data)
            } catch (e) { //更新错误
                return '更新失败,请重试'
            }
            return '更新成功'
        }
    }
    //删除文章
    static async deleteArticle(userId, id) {
        let user = await User.findById(userId,
            {
                include: [
                    {
                        model: Article,
                        as: 'Article',
                        where: {
                            id: id
                        }
                    },
                ]
            })
        if (!user) {
            return false //找不到文章
        } else {
            await user.Article[0].destroy()
            return true
        }
    }
}

module.exports = {UserModel, ArticleModel}
