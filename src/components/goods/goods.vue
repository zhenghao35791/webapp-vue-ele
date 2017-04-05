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
                        <li @click="selectFood(food,$event)" v-for="food in item.foods" class="goods-food-item ">
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
                                <div class="cartcontrol-wrapper">
                                    <cart-control @add="addFood" :food="food"></cart-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shop-chat ref="shopcart"
                  :deliveryPrice="seller.deliveryPrice"
                  :minPrice="seller.minPrice"
                  :selectFoods="selectFoods">
        </shop-chat>
        <!-- 引入food组件  -->
        <food @add="addFood" :food="selectedFood" ref="food"></food>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopChat from '../shopCart/shopCart';
    import cartControl from '../cartControl/cartControl';
    import food from '../food/food';
    const ERROR_OR = 0;

    export default{
        /* 在app.vue中<router-view :seller="seller"></router-view>
        通过router把seller传给goods
        再通过goods把seller对象传给子组件shopchart
        * */
        props: {
            seller: {
                type: Object
            }
        },
        // props: ['goods'],
        data() {
            return {
                goods: {},
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
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
            },
            // 返回被选过的food
            selectFoods () {
                let foods = [];
                if (this.goods.length) {
                    this.goods.forEach((good) => {
                        good.foods.forEach((food) => {
                            /* 如果food有count属性，说明被点击过
                               如果count变成了0，food.count是false，将会重新计算属性，把这个count0的food移除
                               如果count大于0，说明购物车中选择了这个food，push进selectFood数组
                              */
                            if (food.count) {
                                foods.push(food);
                            }
                        });
                    });
                }
                return foods;
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
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            },
            _initScroll: function() {
                this.menuScroll = new BScroll(document.getElementById('menuWrapper'), {
                    click: true
                });
                this.foodsScroll = new BScroll(document.getElementById('foodsWrapper'), {
                    click: true,
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
             //   console.log('this.listHeight: ' + this.listHeight);
            },
            // 事件监听，把target传进来
            addFood(target) {
                this._drop(target);
            },
            // 私有方法drop，可以调用shopchat.drop方法，通过addFood方法把target传进来
            // 实现了把cartcontrol里面的dom传递给伏组件goods，父组件再调用子组件的方法
            _drop(target) {
                // 体验优化,异步执行下落动画，下一轮再执行
                this.$nextTick(() => {
                    // this.$refs访问子组件，再调用drop方法，把target传进去
                    this.$refs.shopcart.drop(target);
                });
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

            this.$http.get('/api/goods').then(response => {
                response = response.body;
                if (response.errno === ERROR_OR) {
                    this.goods = response.data;
                    this.$nextTick(function () {
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
            shopChat: shopChat,
            cartControl: cartControl,
            food: food
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
                    .cartcontrol-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }
            }
        }
    }
</style>

