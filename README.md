# svg-components

#### 封装一个基于webpack + vue的svg-icon组件

- **添加svg-sprite-loader**

  - yarn add svg-sprite-loader -D

- 配置webpack

  - 新建vue.config.js文件

  - 配置vue.config.js

    ```
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
    ```

- 编写组件

  - 在components下新建组件svgIcon.vue

  ```
  <template>
    <svg :class="svgClass" v-on="$listeners">
      <use :xlink:href="iconName" />
    </svg>
  </template>
  <script>
  export default {
    name: "SvgIcon",
    props: {
      iconClass: {
        type: String,
        required: true,
      },
      className: {
        type: String,
        default: "",
      },
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`;
      },
      svgClass() {
        if (this.className) {
          return "svg-icon " + this.className;
        } else {
          return "svg-icon";
        }
      },
    },
  };
  </script>
  <style scoped>
  .svg-icon {
    width: 24px;
    height: 24px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  </style>
  ```

- 导入svg-icon

  - 在assets下新建icons/svg文件夹
  - 在[iconfont](https://www.iconfont.cn/)查找需要的icon，并复制对应的SVG
  - 在icons/svg文件夹下新建一个.svg后缀的文件，将复制的内容粘贴进该文件夹（例如：demo.svg）
  - 在icons下新建index.js文件，自动导入svg-icon

  ``` 
  import Vue from 'vue'
  import svgIcon from '@/components/svgIcon.vue';
  
  const req = require.context('./svg', false, /\.svg$/)
  req.keys().map(req);
  
  Vue.component('svg-icon', svgIcon)//全局注册svg-icon组件
  ```

- 在main.js中引入

  ```
  //svg-icon
  import './assets/icons/index';
  ```

- 在页面中使用

  ```
  <svg-icon icon-class="demo" className="svgIcon"></svg-icon>
  ```

- 封装好后，需要使用时，只需要在iconfont复制对应的SVG，然后在icons文件夹下建立对应的svg文件，并在使用时，将svg-icon组件的icon-class属性对应好文件名即可