<template>
    <div class="my-header">
        <div class="my-header-content">
            <!-- <span class="greet">hi，{{username}}
            </span> -->
            <span class="my-header-title">搜索结果</span>
            <span class="my-header-return-bt cp main-style"
            @click="returnhome()">返回</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        props:[
            "username"
        ],
        computed() {
        },
        components: {

        },
        methods: {
            returnhome: function(){
                window.location.href = '/'
            }
        }
    }
</script>

<style lang="scss">
$HeadHeight: 11vh;
.my-header{
    height: $HeadHeight;
    background-color: #e16a6e;
    font-size: 23px;
    margin-bottom: $HeadHeight/4;
}
.my-header-content{
    color: #ffffff;
    position: relative;
}
.my-header-content > span{
    position: absolute;
}
.greet{
    left: 2vw;
    line-height: $HeadHeight;
}
.my-header-title{
    width: 100%;
    text-align: center;
    line-height: $HeadHeight;
}
.my-header-return-bt{
    display: block;
    width: $HeadHeight*5/6;
    height: $HeadHeight/2;
    border: #ffffff 1px solid;
    border-radius: 0.3vw;
    top: $HeadHeight/4;
    right: $HeadHeight/2;
    text-align: center;
    line-height: $HeadHeight/2;
}
</style>
