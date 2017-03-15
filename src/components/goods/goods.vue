<template>
    <div class="header">
        我是goods组件
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

</style>

