import Vue from 'vue';
// node——modules/vue-router/package.json文件中可以看到name为vue-router
import Router from 'vue-router';
import Goods from '../components/goods/goods';
import Ratings from '../components/ratings/ratings';
import Seller from '../components/seller/seller';

Vue.use(Router); // 需要import Vue和Router，不然会报错undefined
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
/*
 const Goods = {template: '<div>goods</div>'};
 const Ratings = {template: '<div>ratings</div>'};
 const Seller = {template: '<div>seller</div>'};
 */

export default new Router({
  routes: [
    // 定义router路由，compont就是import进来的组件
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
});

