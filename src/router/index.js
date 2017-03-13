import Vue from 'vue';
// node——modules/vue-router/package.json文件中可以看到name为vue-router
import Router from 'vue-router';
/*
../components/goods/goods和@/components/goods/goods两种配置方法都可以
原因是在webpack.base.conf.js配置中'@': resolve('src'),
@等同与src路径
 */
import Goods from '@/components/goods/goods';
import Ratings from '@/components/ratings/ratings';
import Seller from '@/components/seller/seller';

Vue.use(Router); // 需要import Vue和Router，不然会报错undefined
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
/*
 const Goods = {template: '<div>goods</div>'};
 const Ratings = {template: '<div>ratings</div>'};
 const Seller = {template: '<div>seller</div>'};
 */
const router = new Router({
    // 传入linkActiveClass，来改变router选中时添加的class名
    linkActiveClass: 'active',
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
/*
 export与export default均可用于导出常量、函数、文件、模块等,
 你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，
 将其导入，以便能够对其进行使用，但在一个文件或模块中，
 export、import可以有多个，export default仅有一个。
*/
export default router;
