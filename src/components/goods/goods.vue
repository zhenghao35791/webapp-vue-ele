<template>
    <div class="goods">
        <div class="goods-menu-wrapper"></div>
        <div class="goods-foods-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    const ERROR_OR = 0;

    export default{
        props: ['seller'],
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
            this.$http.get('/api/goods').then(response => {
                response = response.body;
                if (response.errno === ERROR_OR) {
                    this.goods = response.data;
                }
            }, response => {
                console.log('error');
            });
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
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
        }
        .goods-foods-wrapper{
            flex: 1;
        }
    }
</style>

