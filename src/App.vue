<template>
    <div id="app">
        <!--总指令入口，去找router文件下的index.js-->
        <eleHeader :seller="seller"></eleHeader>
        <div class="tab border-1px">
            <router-link class="tab-item" to="/goods">商品</router-link>
            <router-link class="tab-item" to="/ratings">评论</router-link>
            <router-link class="tab-item" to="/seller">商家</router-link>
        </div>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    /* // 默认原始的js内容
     import Hello from '@/components/Hello';
     export default {
     name: 'app',
     components: {
     Hello
     }
     }; */
    import eleHeader from './components/header/header';

    export default {
        data() {
            return {
                seller: {}
            };
        },
        // 钩子函数
        created() {
            this.$http.get('/api/seller').then(response => {
                response = response.body;
                if (response.errno === 0) {
                    this.seller = response.data;
                }
            }, response => {
                console.log('error');
            });
        },
        components: {
            eleHeader: eleHeader
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    @import './common/css/func.less';

    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        .border-1px(rgba(7,17,27,0.1));
        .tab-item {
            flex: 1;
            text-align: center;
        }
        a {
            display: block;
            font-size: 14px;
            color: rgb(77,85,93);
        }
        .active {
            color: red;
        }
    }
</style>
