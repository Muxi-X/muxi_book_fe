<template>
    <div>
        <form action="search" method="get">
            <input type="text" class="input-box" name="keyword" v-model="keyword">
            <img src="../pictures/icon/search.png" class="input-button cp"
            @click="search">
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               keyword:""
            };
        },
        components: {
           
        },
        methods: {
            search: function() {
                window.location.href = './search?keyword='+this.keyword
                //console.log(this.keyword)
            }
        }
    }
</script>

<style lang="scss">
.input-box{
    position: relative;
    top: -1.5vh;
    width: 17.2vw;
    height: 4vh;
    border: 2px solid #676767;
    border-radius: 2.64vw;
}
.input-button{
    height: 4.5vh;
    margin-left: 1vh;
    position: relative;
}
</style>
