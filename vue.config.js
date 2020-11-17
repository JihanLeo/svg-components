// resolve定义⼀个绝对路径获取函数
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,

    chainWebpack: config => {
        // 配置svg规则排除icons⽬录中svg⽂件处理
        // ⽬标给svg规则增加⼀个排除选项exclude:['path/to/icon']
        config.module.rule("svg")
            .exclude.add(resolve("src/assets/icons"))
        // 新增icons规则，设置svg-sprite-loader处理icons⽬录中的svg
        config.module.rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('./src/assets/icons')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    }
}