module.exports = {
    devServer: {
        proxy: {
            // 分类
            "/cats": {
                //指定输出的端口 指向的就是 "http://api.zhuishushenqi.com" 这个端口
                target: "http://api.zhuishushenqi.com", //接口域名
                //secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true ////是否跨域
            },
            // 书籍评论
            "/post": {
                //指定输出的端口 指向的就是 "http://api.zhuishushenqi.com" 这个端口
                target: "http://api.zhuishushenqi.com", //接口域名
                //secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true ////是否跨域
            },
            // 排行
            "/ranking": {
                //指定输出的端口 指向的就是 "http://api.zhuishushenqi.com" 这个端口
                target: "http://api.zhuishushenqi.com", //接口域名
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true ////是否跨域,
            },
            // 目录
            "/toc": {
                target: "http://lunbo.gdugm.cn", //接口域名
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true ////是否跨域,
            },
            // 源id目录
            "/btoc": {
                target: "http://api.zhuishushenqi.com", //接口域名
                // secure: false, // 如果是https接口，需要配置这个参数
                pathRewrite: { "^/btoc": "/btoc" },
                changeOrigin: true ////是否跨域,
            },

            "/book": {
                target: "http://api.zhuishushenqi.com",
                changeOrigin: true
            },

            "/content": {
                target: "http://chapter2.zhuishushenqi.com/",
                pathRewrite: { "^/content": "/" },
                changeOrigin: true
            },
            "/book-list": {
                target: "http://api.zhuishushenqi.com",
                changeOrigin: true
            },
        },
        host: "localhost",
        port: 8080 // 开启服务器的端口
    }
};