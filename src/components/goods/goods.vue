<template>
    <div class="goods">
        <div class="goods-menu-wrapper">
            <ul>
                <li v-for="(item,index) in goods" class="goods-menu-item">
                    <span class="goods-text">
                        <span :class="classMap[item.type]"
                              class="goods-icon"
                              v-show="item.type>0">
                        </span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="goods-foods-wrapper">
            <ul>
                <li v-for="item in goods" class="goods-food-list">
                    <h1 class="food-title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="goods-food-item ">
                            <div class="food-icon">
                                <img height="57" width="57" :src="food.icon" alt="food-icon"/>
                            </div>
                            <div class="food-content">
                                <h2 class="food-name">{{food.name}}</h2>
                                <p class="food-desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="goods-sales">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="food-now-price">{{food.price}}元</span>
                                    <span class="food-old-price" v-show="food.oldPrice">{{food.oldPrice}}元</span>
                                </div>
                            </div>

                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const ERROR_OR = 0;

    export default{
        // props: ['goods'],
        data() {
            return {
                goods: {}
            };
        },
        computerd: {
            /*
            detailShow () {
                return this.$store.state.showType;
            }
            */
        },
        methods: {

        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

            this.$http.get('/api/goods').then(response => {
                response = response.body;
                if (response.errno === ERROR_OR) {
                    this.goods = response.data;
                }
            }, response => {
                console.log('error');
            });
        },
        components: {
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    @import '../../common/css/func.less';

    /*商品详情主页面的flex布局*/
    .goods{
        display: flex;
        position:absolute;
        top:174px;
        bottom:46px;
        width:100%;
        overflow:hidden;
        .goods-menu-wrapper{
            /*定死80px的宽度*/
            flew: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            .goods-menu-item{
                display: table;
                padding:0 12px;
                height: 54px;
                width: 56px;
                line-height: 14px;
                /*icon 样式，待抽成组件*/
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
                .goods-icon{
                    display: inline-block;
                    vertical-align: top;
                    background-repeat:no-repeat;
                    margin-right: 2px;
                    height: 12px;
                    width: 12px;
                    background-size: 12px 12px;
                .bg-image-func(3)
                }

                /*icon 样式，待抽成组件*/
                .goods-text{
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    font-size: 12px;
                    .border-1px(rgba(7, 17, 27, 0.1))
                }
            }
        }
        .goods-foods-wrapper{
            flex: 1;
            .food-title{
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left:2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
            }
            .goods-food-item{
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                .border-1px(rgba(7, 17, 27, 0.1));

                &:last-child{
                 .border-1px(rgba(7, 17, 27, 0));
                 margin-bottom: 0;
                 }
                .food-icon{
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .food-content{
                    flex: 1;
                    .food-name{
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .food-desc{
                        margin-bottom: 8px;
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .extra{
                        margin-bottom: 0;
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .goods-sales{
                        margin-right: 12px;
                    }
                    .price{
                            font-weight:700;
                            line-height:24px;
                        .food-now-price{
                            margin-right: 10px;
                            font-size: 14px;
                            color: rgb(240, 20, 20);
                        }
                        .food-old-price{
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                }
            }
        }
    }
</style>

