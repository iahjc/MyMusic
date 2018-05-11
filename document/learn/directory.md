## 目录结构
  * build webpack构建
  * config 配置文件
  * document 文档
  * src 源码目录
    * api 接口目录
    * base 公共组件目录
    * db 本地存储接口
    * domain 实体类接口
    * common 公共资源,工具,css等
      - fonts 字体文件
      - images 静态图片
      - js  公共javascript文件
      - scss 样式文件
        * base
              放置一些基本的scss文件，比如重置样式_normalize.scss,基本样式_base.scss,文本排版样式_typography.scss
        * components
              放置一些公用组件， 比如: 按钮_buttons.scss,表单_form.scss,表格_tables.scss,选项卡_tabs.scss等
        * helpers
              放置一些辅助功能性文件， 比如: css3.scss variables.scss mixins.scss helpers.scss function.scss
        * layout
              放置一些跟页面布局相关的 比如:layout.scss,header.scss,footer.scss,slider.scss
        * pages
              放置跟具体项目相关的样式文件
        * themes
              对于一些有前后台的页面，或者需要换肤的项目，就可以将相关文件放置在这里。
        * vendors
              引用外部插件或者框架的scss文件，比如bootstrap.scss,foundation.scss
        * style.scss
              这是主样式文件，最终编译，就编译这个文件。当然根据项目的大小，可做一些其他的处理，比如针对不同的页面，创建不同的page_XX.scss文件
    * components 组件
    * pages 页面路由渲染
    * router 路由管理
    * store  vuex状态管理
    * main.js 入口文件
    * App.vue 入口vue
  * static 静态文件
  * test 测试目录
  * .babelrc
  * .DS_Store
  * .editorconfig
  * .eslintignore
  * .eslintrc.js
  * .gitignore
  * .postcssrc.js
  * index.html
  * package-lock.json
  * README.md
