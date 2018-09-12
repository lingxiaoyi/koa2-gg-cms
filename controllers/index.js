const path = require('path')
const mime = require('mime')
const fs = require('mz/fs')
//const request = require('superagent')
const rp = require('request-promise')
const APIError = require('../util/rest').APIError
module.exports = {
    'get /': async(ctx, next) => {
        let rpath = path.resolve(__dirname, '../static/index.html')
        if (await fs.exists(rpath)) {
            ctx.response.type = mime.lookup(rpath)
            ctx.response.body = await fs.readFile(rpath)
        } else {
            ctx.response.status = 404
        }
    },
    'get /:id/:todo': async(ctx, next) => {
        ctx.response.type = 'text/html'
        ctx.response.body = '<h1>找不到页面</h1>'
    },
    'get /public/bus/Getstop': async(ctx, next) => {
        let body = await rp({
            method: 'POST',
            uri: 'http://shanghaicity.openservice.kankanews.com/public/bus/Getstop',
            form: {
                stoptype: '0',
                stopid: '54.',
                sid: '6a005acd04da149bfaf0e2ba52f16077'
            },
            headers: {
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
                //'Content-Length': '',
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: '_ga=GA1.2.1373205916.1533562785; HA=e7436beb7035e5dc36dfd05d044aa262c2d655d6; HB=ZTc0MzZiZWI3MDM1ZTVkYzM2ZGZkMDVkMDQ0YWEyNjJjMmQ2NTVkNg==; HC=1f003f1eb1d2071f5bef8995b16a333c1fa27cd1; HD=MjAxODA4MDY=; HG=23ee3aba1f7b177f38e9128d8244255d162c5ff9; HH=dc6335c75dc45f30c611d47e14bb86aad8c6a5e6; HK=940feaf29d29419ef2aba948ba67989cea5d6f41; HO=TWpBeE9EQTRNRFk9MjFNVFF3TWpBMzM5VFc5NmFXeHNZUzgxTGpBZ0tHbFFhRzl1WlRzZ1ExQlZJR2xRYUc5dVpTQlBVeUF4TVY4MFh6RWdiR2xyWlNCTllXTWdUMU1nV0NrZ1FYQndiR1ZYWldKTGFYUXZOakExTGpFdU1UVWdLRXRJVkUxTUxDQnNhV3RsSUVkbFkydHZLU0JOYjJKcGJHVXZNVFZITnpjZ1RXbGpjbTlOWlhOelpXNW5aWEl2Tmk0M0xqRWdUbVYwVkhsd1pTOVhTVVpKSUV4aGJtZDFZV2RsTDNwb1gwTk8xZjJlNTFjMWE3MzBkMmQ0MzE0Yzc5NDY5NmI4ZWEwZmEzMjdiMmE0; HY=MjAxODA4MDY=940feaf29d29419ef2aba948ba67989cea5d6f4123ee3aba1f7b177f38e9128d8244255d162c5ff91f2e51c1a730d2d4314c794696b8ea0fa327b2a4; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFtoT6NrJQcTDgsfAg==; _gat=1; Hm_1vt_6f69830ae7173059e935b61372431b35=eSgsNFtoT6BrJQcTDgsYAg==',
                Host: 'shanghaicity.openservice.kankanews.com',
                Origin: 'http://shanghaicity.openservice.kankanews.com',
                Pragma: 'no-cache',
                Referer: 'http://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/6a005acd04da149bfaf0e2ba52f16077/stoptype/1',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        ctx.rest(body)
        /*try {
            await request.post('http://shanghaicity.openservice.kankanews.com/public/bus/Getstop')
            .send('stoptype=1')
            .send('stopid=7.')
            .send('sid=6a005acd04da149bfaf0e2ba52f16077')
            .set({ Accept: '*!/!*',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
                'Content-Length': '57',
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: '_ga=GA1.2.1373205916.1533562785; HA=e7436beb7035e5dc36dfd05d044aa262c2d655d6; HB=ZTc0MzZiZWI3MDM1ZTVkYzM2ZGZkMDVkMDQ0YWEyNjJjMmQ2NTVkNg==; HC=1f003f1eb1d2071f5bef8995b16a333c1fa27cd1; HD=MjAxODA4MDY=; HG=23ee3aba1f7b177f38e9128d8244255d162c5ff9; HH=dc6335c75dc45f30c611d47e14bb86aad8c6a5e6; HK=940feaf29d29419ef2aba948ba67989cea5d6f41; HO=TWpBeE9EQTRNRFk9MjFNVFF3TWpBMzM5VFc5NmFXeHNZUzgxTGpBZ0tHbFFhRzl1WlRzZ1ExQlZJR2xRYUc5dVpTQlBVeUF4TVY4MFh6RWdiR2xyWlNCTllXTWdUMU1nV0NrZ1FYQndiR1ZYWldKTGFYUXZOakExTGpFdU1UVWdLRXRJVkUxTUxDQnNhV3RsSUVkbFkydHZLU0JOYjJKcGJHVXZNVFZITnpjZ1RXbGpjbTlOWlhOelpXNW5aWEl2Tmk0M0xqRWdUbVYwVkhsd1pTOVhTVVpKSUV4aGJtZDFZV2RsTDNwb1gwTk8xZjJlNTFjMWE3MzBkMmQ0MzE0Yzc5NDY5NmI4ZWEwZmEzMjdiMmE0; HY=MjAxODA4MDY=940feaf29d29419ef2aba948ba67989cea5d6f4123ee3aba1f7b177f38e9128d8244255d162c5ff91f2e51c1a730d2d4314c794696b8ea0fa327b2a4; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFtoT6NrJQcTDgsfAg==; _gat=1; Hm_1vt_6f69830ae7173059e935b61372431b35=eSgsNFtoT6BrJQcTDgsYAg==',
                Host: 'shanghaicity.openservice.kankanews.com',
                Origin: 'http://shanghaicity.openservice.kankanews.com',
                Pragma: 'no-cache',
                Referer: 'http://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/6a005acd04da149bfaf0e2ba52f16077/stoptype/1',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
                'X-Requested-With': 'XMLHttpRequest'})
            .then(function(res) {
                //ctx.rest(res.text)
                ctx.response.body = {
                    code: '200',
                    message: 'success',
                    data: JSON.parse(res.text)
                }
            })
        } catch (e) {
            throw new APIError('error', e)
        }*/
    }
}
