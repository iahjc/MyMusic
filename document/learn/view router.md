## view router
* 将vue-router添加进来，我们需要做的是，将组建(components)映射到路由(routes),然后告诉vue-router在哪里渲染他们
      <div id="app">
        <h1>Hello App!</h1>
        <p>
          <!-- 使用 router-link 组件来导航 -->
          <!-- 通过传入 to 属性指定链接。 -->
          <!-- <router-link> 默认会被渲染成一个 '<a>' 标签 -->
          <router-link to="/foo">Go to Foo</router-link>
        </p>

        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染到这里 -->
        <router-view></router-view>
      </div>
* 注入路由，我们可以用this.$router来访问他，就像在任何组件里用thi.$router访问当前路由一样。
      this.$route.params.username
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
* 当<router-link>对应的路由匹配成功，将自动设置class属性值.router-link-active.

## 动态路由匹配
      const user = {
        template: '<div>user</div>'
      }

      const router = new VueRouter({
          routes: [
            // 动态路径参数 以冒号开头
            {
              path: '/user/:id',
              component: user
            }
          ]
      })

* 动态路由匹配到一个路由时，参数会被设置到this.$route.params中
* 多个参数
        /user/:username/post/:post_id
        /user/evan/post/123
