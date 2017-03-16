<template>
    <div class="goods">
        <div class="goods-menu-wrapper" id="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods"
                    class="goods-menu-item"
                    :class="{'current':currentIndex===index}"
                    @click="selectMenu(index, $event)">
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
        <div class="goods-foods-wrapper" id="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="goods-food-list food-list-hook">
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
                                    <span class="goods-sales">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="food-now-price">{{food.price}}元</span><span class="food-old-price" v-show="food.oldPrice">{{food.oldPrice}}元</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shop-chat></shop-chat>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopChat from '../shopChat/shopChat';
    const ERROR_OR = 0;

    export default{
        // props: ['goods'],
        data() {
            return {
                goods: {},
                listHeight: [],
                scrollY: 0
            };
        },
        computed: {
            currentIndex () {
                /*
                * 定义前一个高度为A，下一个高度为B
                * if ！heightB，若for循环进行到最后，i的值会是undefined，说明滚动到了最末端
                * 如果没有滚动到最末端，当前高度scrollY在A和B高度之间时，返回listHeight【i】，得知foodList的当前dom
                * 如果for循环结束，if语句都没有执行，说明屏幕没有滚动过，return0
                * */
                for (var i = 0; i < this.listHeight.length; i++) {
                    let heightA = this.listHeight[i];
                    let heightB = this.listHeight[i + 1];
                    if ((!heightB) || (this.scrollY < heightB && this.scrollY >= heightA)) {
                        return i;
                    }
                }
                return 0;
            }
        },
        methods: {
            selectMenu(index, event) {
                // 阻止原生的click事件调用
                if (!event._constructed) {
                    return;
                }
                let foodList = document.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            _initScroll: function() {
                this.menuScroll = new BScroll(document.getElementById('menuWrapper'), {
                    click: true
                });
                this.foodsScroll = new BScroll(document.getElementById('foodsWrapper'), {
                    probeType: 3 // scroll在滚动的时候可以暴露出的滚动位置
                });
                // 监听scroll事件，pos是this.foodsScroll暴露出的滚动位置,dom滚动的时候把高度赋值给scrollY
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calHeight: function() {
                // 取得foodlist的dom
                var foodList = document.getElementsByClassName('food-list-hook');
                var height = 0;
                this.listHeight.push(height); // 把初始高度放入这个数组

                for (var i = 0; i < foodList.length; i++) {
                    var item = foodList[i]; // 拿到每一个foodList dom
                    height += item.clientHeight; // 拿到每一个dom的高度
                    this.listHeight.push(height); // 把每一个dom的高度放入这个数组
                }
                console.log('this.listHeight: ' + this.listHeight);
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

            this.$http.get('/api/goods').then(response => {
                response = response.body;
                if (response.errno === ERROR_OR) {
                    this.goods = response.data;
                    this.$nextTick(function () {
                        // DOM 更新了
                        // vue更新dom是异步的，计算高度有问题，把它放入到下一个tick中执行
                        this._initScroll();
                        this._calHeight();
                    });
                }
            }, response => {
                console.log('error');
            });
        },
        components: {
            shopChat: shopChat
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
                &.current{
                    position: relative;
                    z-index: 10;
                    margin-top: -1px;
                    background: #fff;
                    font-weight: 700;
                    .goods-text{
                        .border-1px(rgba(7, 17, 27, 0))
                    }
                 }
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
                        line-height: 12px;
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

