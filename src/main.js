// The Vue build version to load with the `import` command
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource'; // 使用之前都需要在main.js里面先引用
import router from './router'; // 引入router文件夹下的index.js，在里面配置路由
import './common/css/index.less';// 加载所有less文件的入口文件index.css

// 让router在已进入页面的时候就自动跳转到goods
router.push({ path: 'goods' });
// 使用VueResouce
Vue.use(VueResource);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 使用在这里import进来的router
  template: '<App/>',
  // 挂载整个App组件
  components: { App }
});
