const {ArticleModel} = require('../model/index')
const APIError = require('../util/rest').APIError
let articleController = {
    //创建文章
    'post /api/v1/article': async(ctx) => {
        let req = ctx.request.body
        req.author = ctx.user.nickname //作者名字
        req.userId = ctx.user.id //关联id
        if (req.title && req.author && req.content && req.category) {
            let ret = await ArticleModel.createArticle(req)
            if (ret) {
                ctx.rest(ret)
            } else {
                throw new APIError('error', '创建文章失败，请重试')
            }
        } else {
            throw new APIError('param_error', '创建文章失败，请求参数不能为空！')
        }
    },
    /**
     * 获取当前作者文章列表
     * @param ctx对象  user信息挂这个对象上
     * @returns {Promise.<void>}
     */
    'get /api/v1/get_article_list': async(ctx) => {
        let id = ctx.user.id
        const data = await ArticleModel.getUserArticleList(id)
        ctx.rest(data)
    },
    //更新文章数据
    'put /api/v1/updateArticle': async(ctx) => {
        let req = ctx.request.body
        req.userId = ctx.user.id
        if (req.title && req.content && req.category && req.id) {
            let res = await ArticleModel.updateArticle(req)
            if (res) {
                ctx.rest(res)
            } else {
                throw new APIError('error', res)
            }
        } else {
            throw new APIError('param_error', '更新文章失败，请求参数不能为空！')
        }
    },
    //删除文章数据
    'delete /api/v1/article/:id': async(ctx) => {
        let id = ctx.params.id
        let userId = ctx.user.id
        if (id && !isNaN(id)) {
            let res = await ArticleModel.deleteArticle(userId, id)
            if (res) {
                ctx.rest('删除文章成功！')
            } else {
                throw new APIError('error', '找不到文章ID')
            }
        } else {
            throw new APIError('error', '文章ID必须传！')
        }
    },
}

module.exports = articleController
