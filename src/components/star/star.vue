<template>
    <div class="star" v-bind:class="starType">
        <span v-for="itemClass in itemClasses"
              v-bind:class="itemClass"
              class="star-item">
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
    const starLength = 5;
    const CLS_ON = 'on';
    const CLS_OFF = 'off';
    const CLS_HALF = 'half';
    export default{
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            itemClasses() {
                var result = [];
                /* 对score的处理，比如传入的是4.2，this.score*2是8.4，向下取整后是8，再除以2是4，是四星
                对score的处理，比如传入的是4.6，this.score*2是9.2，向下取整后是9，再除以2是4.5，是四星半 */
                var score = Math.floor(this.score * 2) / 2;
                // 如果返回是true，说明有小数位，即有半星
                var hasDecimal = score % 1 !== 0;
                // 返回的是星星位数的整数位，即四星半返回值为4
                var integer = Math.floor(score);
                /*
                根据score和hasDecimal，完成星星数组result的构建
                1.for循环，看有多少个整个的星星
                2.判断是否有半个星星，如果有，就插入result
                3.当result长度小于五的时候，push进去空的星星
                */
                for (var i = 0; i < integer; i++) {
                    result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF);
                }
                while (result.length < starLength) {
                    result.push(CLS_OFF);
                }
        // 比如三星半，result就是[on,on,on,half,off]
        return result;
            }
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
    .star{
        font-size:0;
        .star-item{
            display: inline-block;
            background-repeat: no-repeat;
        }
    }
    .star-24{
        .star-item{
            width: 10px;
            height: 10px;
            margin-right: 3px;
            background-size: 10px 10px;
        &:last-child{
             margin-right: 0; /*最后的星星star-item没有margin-right*/
         }
        &.on{
         .bg-image('star24_on');
         }
        &.half{
         .bg-image('star24_half');
         }
        &.off{
         .bg-image('star24_off');
         }
        }
    }
    .star-36{
        .star-item{
            width: 15px;
            height: 15px;
            margin-right: 6px;
            background-size: 15px 15px;
            &:last-child{
                 margin-right: 0; /*最后的星星star-item没有margin-right*/
             }
            &.on{
             .bg-image('star36_on');
             }
            &.half{
             .bg-image('star36_half');
             }
            &.off{
             .bg-image('star36_off');
             }
        }
    }
    .star-48{
        .star-item{
            width: 20px;
            height: 20px;
            margin-right: 22px;
            background-size: 20px 20px;
            &:last-child{
               margin-right: 0; /*最后的星星star-item没有margin-right*/
            }
            &.on{
             .bg-image('star48_on');
             }
            &.half{
             .bg-image('star48_half');
             }
            &.off{
             .bg-image('star48_off');
             }
        }
    }
</style>

