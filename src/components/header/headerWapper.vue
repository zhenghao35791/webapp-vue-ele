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
                    <!--<span class="support-icon"
                          :class="classMap[seller.supports[index].type]"
                            >
                    </span>-->
                    <support-icon :seller="seller" :index="index"  class="support-icon"></support-icon>
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
    import supportIcon from '../config/supportIcon';

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
                // console.log(this.$store.state.showType);
                // console.log(this.detailType);
            }
        },
        components: {
            // 注册组件
            star: star,
            supportIcon: supportIcon
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    .bg-image(@url){
        background-image: url("@{url}@2x.png");
        @media only screen and (-webkit-min-device-pixel-ratio: 3),
        only screen and (min--moz-device-pixel-ratio: 3)
        {
            backgoud-image: url("@{url}@3x.png");
        }
    }
    .bg-image-func(@num){
    &.decrease{
        .bg-image('decrease_@{num}');
        };
    &.discount{
     .bg-image('discount_@{num}');
     };
    &.guarantee{
     .bg-image('guarantee_@{num}');
     };
    &.invoice{
     .bg-image('invoice_@{num}');
     };
    &.special{
     .bg-image('special_@{num}');
     };
    }
    .support-icon{
        display: inline-block;
        vertical-align: top;
        background-repeat:no-repeat;
        margin-right: 6px;
        height: 16px;
        width: 16px;
        background-size: 16px 16px;
    .bg-image-func(2)
    }

</style>

