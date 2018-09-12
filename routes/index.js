const path = require('path')
const fs = require('fs')

function addMapping(router, mapping) {
    for (let url in mapping) {
        if (!mapping.hasOwnProperty(url)) continue
        if (url.startsWith('get ')) {
            let path = url.substring(4)
            router.get(path, mapping[url])
        } else if (url.startsWith('post ')) {
            let path = url.substring(5)
            router.post(path, mapping[url])
        } else if (url.startsWith('put ')) {
            let path = url.substring(4)
            router.put(path, mapping[url])
        } else if (url.startsWith('delete ')) {
            let path = url.substring(7)
            router.del(path, mapping[url])
        } else {
            console.log(`invalid URL: ${url}`)
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(path.resolve(__dirname, dir)).filter((f) => {
        return f.endsWith('.js')
    }).forEach((f) => {
        let mapping = require(path.resolve(__dirname, `${dir}/${f}`))
        addMapping(router, mapping)
    })
}

//上传图片
function addUploadFile(router) {
    //文件上传
    const multer = require('koa-multer')
    //配置
    let storage = multer.diskStorage({
        //文件保存路径
        destination: function(req, file, cb) {
            cb(null, './public/uploads/img/')
        },
        filename: function(req, file, cb) {
            let fileFormat = (file.originalname).split('.')
            cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
        }
    })
    let upload = multer({storage: storage})
    //upload.single('file')这里面的file是上传空间的name<input type="file" name="file"/>
    router.post('/upload_file', upload.single('file'), async(ctx, next) => {
        //ctx.response.body = '<h1>上传成功！</h1>'
        ctx.rest({
            filename: ctx.req.file.filename//返回文件名
        })
        //ctx.redirect('/index')
    })
    console.log(`register URL mapping: POST /uploadFile`)
}

module.exports = function(dir) {
    let controllers_dir = dir || '../controllers'
    let router = require('koa-router')()
    //let router = new Router()
    addControllers(router, controllers_dir)
    addUploadFile(router)
    return router
}
