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
            <div v-if="seller.supports"  class="support-count" @click="showDetail()">
                <span class="support-count-span">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="announcement-wrapper" @click="showDetail()">
            <span class="announcement-title"></span><span class="announcement-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="header-background">
            <img :src="seller.avatar" width="100%" height="100%" alt="背景图"/>
        </div>
        <div v-show="detailShow" class="header-detail">
            <!--sticky-footer布局-->
            <div class="header-detail-wrapper clearfix">
                <div class="header-detail-main">

                </div>
            </div>
            <div class="header-detail-close">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        // 子组件要显式地用 props 选项声明它期待获得的数据：
        props: ['seller'],
        // data是个方法，不是个对象
        data () {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetail: function() {
                this.detailShow = true;
            }
        },
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
        position: relative;
        background: rgba(7, 17, 27, 0.5);
        overflow: hidden;
        color: #ffffff;
        .header-content-wrapper{
            position: relative;
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
                        line-height: 12px;
                        margin-right: 4px;
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
                        display: inline-block;
                        vertical-align: top;
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
            }
            .support-count{
                position: absolute;
                right: 12px;
                bottom: 14px;
                padding:0 8px;
                height:24px;
                line-height: 24px;
                border-radius: 14px;
                background: rgba(0 ,0 ,0 ,0.2);
                text-align: center;
                .support-count-span{
                    vertical-align: top;
                    font-size: 10px;
                }
                .icon-keyboard_arrow_right{
                    margin-left: 2px;
                    line-height: 24px;
                    font-size: 10px;
                }
            }
        }
        .announcement-wrapper{
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            background: rgba(7, 17, 27, 0.2);
            /*超出部分用...表示的css样式，三样*/
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .announcement-title{
                display: inline-block;
                margin-top: 8px;
                vertical-align: top;
                width: 22px;
                height: 12px;
                background-size: 22px 12px;
                background-repeat: no-repeat;
                .bg-image('bulletin');
            }
            .announcement-text{
                margin: 0 4px 0 4px;
                vertical-align: top;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right{
                position: absolute;
                right: 12px;
                top: 8px;
                font-size: 10px;
            }
        }
        .header-background{
            /*header撑满的背景图,利用绝对定位撑满和zindex-1*/
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            /*背景图滤镜的效果*/
            filter: blur(10px);
        }
        .header-detail{
            position: fixed;
            top: 0;
            left: 0;
            overflow: auto;
            z-index: 100;
            width: 100%;
            height: 100%;
            background: rgba(7, 17, 27, 0.8);
            .header-detail-wrapper{
                /* 最小高度要撑满屏幕 detail-close的padding才能根据满屏幕 */
                min-height:100%;
                .header-detail-main{
                    margin-top: 64px;
                    /*sticky-footer 很重要的padding-bottom，给底部X的小图标留有64px的空间*/
                    padding-bottom: 64px;
                }
            }
            .header-detail-close{
                /*sticky-footer*/
                position: relative;
                clear: both;
                /*sticky-footer 通过负的margin把图标向上提*/
                margin: -64px auto 0 auto;
                width: 32px;
                height: 32px;
                color: rgba(255, 255, 255, 0.5);
                font-size: 32px;
            }
        }

    }
</style>

