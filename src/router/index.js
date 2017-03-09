import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router) // 需要import Vue和Router，不然会报错undefined

export default new Router({
  routes: [
    {
      // 定义router路由，使用组件Hello，去找componets下的Hello.vue
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
