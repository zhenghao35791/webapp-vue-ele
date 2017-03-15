<template>
    <span :class="classMap[seller.supports[index].type]">
    </span>
</template>
<script type="text/ecmascript-6">
    export default{
        props: ['seller', 'index'],
        created() {
            // 创建组件的时候定义classMap，对应seller.supports.type里面的0，1，2，3，4顺序，找到图片名称
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        }
    };
</script>
<style lang="less" rel="stylesheet/less">

</style>

