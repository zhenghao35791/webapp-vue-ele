<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="num"></div>
                </div>
                <div class="price">元</div>
                <div class="desc">另需配送费元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay">起送
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {

    };
</script>
<style lang="less" rel="stylesheet/less">
    .shopcart{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
        .content{
            display: flex;
            background: #141d27;
            .content-left{
                flex: 1; /*flex是1，代表自适应*/
                .logo-wrapper{
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    background: #141d27;
                    .logo{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        text-align: center;
                        background: #2b343c;
                        .icon-shopping_cart{
                            line-height: 44px;
                            font-size: 24px;
                            color: #80858a;
                        }
                    }
                    .num{

                    }
                }
                .price{
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 12px;
                    line-height: 24px;
                    padding-right: 12px;
                    box-sizing: border-box;
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 16px;
                    font-weight: 700;
                }
                .desc{
                    display: inline-block;
                }
            }
            .content-right{
               flex: 0 0 105px /*flex是105px，代表105px定宽度*/
            }
        }
    }

</style>

