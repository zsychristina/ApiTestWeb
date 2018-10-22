const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('~', resolve('src'))
    },
    devServer: {
        host: '127.0.0.1',
        // host: '192.168.6.19',
        port: 8010,
        proxy: {
            '/api/': {
                target: 'http://127.0.0.1:8080',
                // target: 'http://192.168.6.19:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            css: {
                localIdentName: process.env.node_env == 'production' ? "[hash]" : '[path]_[name]_[local]_[hash:base64:5]',
                camelCase: 'only'
            },
            sass: {}
        },
    }
};