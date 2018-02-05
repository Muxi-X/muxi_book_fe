<template>
    <div>
        <v-bgshadow></v-bgshadow>
        <!-- 背景 -->
        <div class="box login-box">
            <div class="box-close"
            @click="ending"></div>
            <div>
                <div class="box-title">请登录</div>
                <div class="reader-submit-bt cp main-style login-bt"
                @click="login">
                    登录
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Bgshadow from './bgshadow.vue';
    import Cookie from '../service/cookie.js';
    import Login from '../service/login.js';
    export default {
        data() {
            return {

            };
        },
        components: {
            'v-bgshadow': Bgshadow
        },
        methods: { 
            login() {
                Login.toLoginPage()
            },
            ending:function(){
                this.$emit("ending")
            }//取消登录
        },
    }
</script>

<style lang="scss">
$LoginBoxw: 200px;
.login-box{
    width: $LoginBoxw;
    height: $LoginBoxw;
    top: 50%;
    left: 50%;
    margin-left: - $LoginBoxw/2;
    margin-top: - $LoginBoxw/2;
}
.login-bt{
    bottom: $LoginBoxw/5;
}
</style>
