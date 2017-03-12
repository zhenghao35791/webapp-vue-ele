// The Vue build version to load with the `import` command
import Vue from 'vue';
import App from './App';
import router from './router'; // 引入router文件夹下的index.js，在里面配置路由
// 让router在已进入页面的时候就自动跳转到goods
router.push({ path: 'goods' });

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 使用在这里import进来的router
  template: '<App/>',
  // 挂载整个App组件
  components: { App }
});
