<template>
    <div class="header">
        <div class="header-content-wrapper">
            <div class="header-avatar">
                <!--src相关不能直接{{}}传值，需要v-bind-->
                <img width="64" height="64" :src="seller.avatar" alt="头像"/>
            </div>
            <div class="header-content">
                <div class="header-title">
                    <span class="header-brand"></span>
                    <span class="header-name">{{seller.name}}</span>
                </div>
                <div class="header-description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <!--如果不先判断seller.supports是否为空，会报错-->
                <!--因为create是异步的，seller对象还是空的时候就去尝试取【0】，报错undefined-->
                <div v-if="seller.supports" class="header-support">
                    <span class="header-icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="header-text">
                        {{seller.supports[0].description}}
                    </span>
                </div>
            </div>
        </div>
        <div class="announcement-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        // 子组件要显式地用 props 选项声明它期待获得的数据：
        props: ['seller'],
        created() {
        // 创建组件的时候定义classMap，对应seller.supports.type里面的0，1，2，3，4顺序，找到图片名称
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
/*
    @import '../../common/css/func.less';
*/
    .bg-image(@url){
        background-image: url("@{url}@2x.png");
        @media only screen and (-webkit-min-device-pixel-ratio: 3),
        only screen and (min--moz-device-pixel-ratio: 3)
        {
          backgoud-image: url("@{url}@3x.png");
        }
    }
    .header{
        color: #ffffff;
        background-color: grey;
        .header-content-wrapper{
            padding: 24px 12px 18px 24px;
            font-size:0; /*设置wrapper的font为0，消除avatar和content中间的空白间隙*/
            .header-avatar{
                display: inline-block;
                vertical-align: top;
                img{
                    border-radius: 2px;
                }
            }
            .header-content{
                display: inline-block;
                font-size: 14px;
                margin-left: 16px;
                .header-title{
                    margin: 2px 0 8px 0;
                    .header-brand{
                        display: inline-block; /*span标签只有改变display后，宽度高度才会生效*/
                        vertical-align: top; /*设置对齐方式，brand和name没有对齐*/
                        width: 30px;
                        height: 18px;
                        .bg-image('brand');
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                    }
                    .header-name{
                        margin-left: 6px;
                        line-height: 18px;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
                .header-description{
                    line-height: 12px;
                    margin-bottom: 10px;
                    font-size: 12px;
                }
                .header-support{
                    .header-icon{
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-bottom: 2px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        &.decrease{
                            .bg-image('decrease_1');
                         };
                        &.discount{
                         .bg-image('discount_1');
                         };
                        &.guarantee{
                         .bg-image('guarantee_1');
                         };
                        &.invoice{
                         .bg-image('invoice_1');
                         };
                        &.special{
                         .bg-image('special_1');
                         };
                    }
                    .header-text{
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
            }
        }
    }
</style>

