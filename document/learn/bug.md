## 需要注意的地方
* data 里面定义的变量 数据类型一定要一致 比如后台返回的是一个对象 定义的时候默认值一定要写空对象 不能定义null
      let res = { title: 'title', name: 'name'}
      data () {
        return {
          sj: {} // 这个地方一定是和res的类型一致 不能写null 不然会报错
        }
      },
      mounted() {
        this.sj = res
      }
