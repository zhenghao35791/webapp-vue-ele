<template>
    <div class="header-detail">
        <div class="header-detail-wrapper clearfix">
            <div class="header-detail-main">
                <h1 class="detail-main-title">{{seller.name}}</h1>
                <div class="star-wrapper">
                    <star :size="48" :score="seller.score"></star>
                </div>
                <div class="header-title">
                    <div class="header-line"></div>
                    <div class="header-text">优惠信息</div>
                    <div class="header-line"></div>
                </div>
                <ul v-if="seller.supports" class="header-discount">
                    <li class="support-item" v-for="(item,index) in seller.supports">
                    <span class="support-icon"
                          :class="classMap[seller.supports[index].type]"
                            >
                    </span>
                        <span class="support-text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
                <div class="header-title">
                    <div class="header-line"></div>
                    <div class="header-text">商家公告</div>
                    <div class="header-line"></div>
                </div>
                <div class="header-bulletin">
                    <p class="header-bulletin-content">{{seller.bulletin}}</p>
                </div>
            </div>
        </div>
        <div class="header-detail-close" @click="hideDetail">
            <i class="icon-close"></i>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from '../star/star';

    export default{
        // 子组件要显式地用 props 选项声明它期待获得的数据：
        props: ['seller', 'detailShow'],
        // data是个方法，不是个对象
        data: function () {
            return {
                temp: 'temp'
            };
        },
        methods: {
            hideDetail: function() {
                this.$store.commit('hideWrapper');
                console.log(this.$store.state.showType);
                // console.log(this.detailType);
            }
        },
        created() {
            // 创建组件的时候定义classMap，对应seller.supports.type里面的0，1，2，3，4顺序，找到图片名称
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
        components: {
            // 注册star组件
            star: star
        }
    };
</script>
<style lang="less" rel="stylesheet/less">

</style>

