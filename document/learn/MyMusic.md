#### Atom配置MakeDown
<ol>
  <li>首先安装markdown preview插件</li>
  <li>windows: crtl + shirf + p</li>
  <li>mac: command + shift + p</li>
  <li>输入 makdown preview toggle(可以偷懒输入mdpt,进行模糊匹配)</li>
  <li>按enter进行预览</li>
</ol>
#### 配置sass支持
<ol>
  <li>npm install node-sass --save-dev</li>
  <li>npm install sass-loader --save-dev</li>
  <li>将依赖添加到package.json中</li>
  <li>如果安装失败 报网络错误可以安装淘宝镜像 cnpm <br />
      <ol>
        <li>npm install -g cnpm --registry=https://registry.npm.taobao.org</li>
        <li>cnpm install node-sass --save</li>
        <li>如果安装cnpm，仍无法安装执行以下命令</li>
        <li>npm install --save node-sass --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass</li>
        <li>说明：</li>
        <li>--registry=https://registry.npm.taobao.org 淘宝npm包镜像</li>
        <li>--disturl=https://npm.taobao.org/dist 淘宝node源码镜像，一些二进制包编译时用</li>
        <li>--sass-binary-site=http://npm.taobao.org/mirrors/node-sass 这个才是node-sass镜像</li>
      </ol>
  </li>
  <li>安装所需要的css loader <br />
      <ol>
        <li>npm install --save-dev sass-loader style-loader css-loader</li>
      </ol>
  </li>
  <li>进入webpack.base.config.js配置sass</li>
  <li>在rules中添加以下代码 <br />
      <ul>
        <li>{</li>
        <li>&nbsp;&nbsp;&nbsp;test: /\.scss$/,</li>
        <li>&nbsp;&nbsp;&nbsp;loaders: ["style", "css", "sass"]</li>
        <li>}</li>
      </ul>
  </li>
  <li>如果需要在vue文件style标签使用scss的话，需要声明以下</li>
  <li>&lt;style lang="scss" scoped="" type="text/css" &gt; &lt;/style&gt;</li>
</ol>
