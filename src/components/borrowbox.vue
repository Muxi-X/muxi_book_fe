<template>
    <div>
        <v-bgshadow
        v-on:ending="ending"></v-bgshadow>
        <div class="box">
            <div class="box-close"
            @click="ending"></div>
            <div v-if="borrowShow">
                <div class="box-title">借阅书籍</div>
                <div class="bookinfo">
                    <div class="bookkind">{{borrowingbook.no}}</div>
                    <div class="bookname">{{borrowingbook.book}}</div>
                </div>
                <div class="reader-sign">
                    <span>借书人： </span>
                    <input type="text" class="reader-sign-input"
                    v-model="borrowData.realname"
                    @keyup.enter="borrow">
                </div>
                <div class="reader-submit-bt main-style cp"
                @click="borrow">
                    借阅
                </div>
            </div>
            <div class="borrow-success" v-if="borrowsuccess">
                <img src="../pictures/icon/selected.png" class="borrow-success-logo"
                @keyup.enter="ending">
                <div class="borrow-success-info">借阅成功</div>
            </div>
            <div class="borrow-success" v-if="authwrong">
                <img src="../pictures/icon/cancel.png" class="borrow-success-logo">
                <div class="borrow-success-info">验证失败</div>
            </div>
            <div class="borrow-success" v-if="beyond">
                <img src="../pictures/icon/cancel.png" class="borrow-success-logo">
                <div class="borrow-success-info">不能借阅超过五本</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Bgshadow from './bgshadow.vue';
    import FetchData from '../service/app.js';
    import Cookie from '../service/cookie.js';
    export default {
        data() {
            return {
                borrowShow: true,
                authwrong: false,
                beyond: false,
                borrowsuccess: false,
                borrowData:{
                    book : this.borrowingbook.book,    // 书名 
                    username: "", //用户名
                    realname : ""  // 真名
            },
                token: ""
            };
        },
        props:['borrowingbook'],
        components: {
            'v-bgshadow': Bgshadow
        },
        methods: {
            ending:function(){
                this.borrowShow = true;
                this.authwrong = false;
                this.beyond = false;
                this.borrowsuccess = false;
                this.$emit("ending")
            },
            borrow:function(){
                this.token = Cookie.getCookie("token")
                this.borrowData.username = Cookie.getCookie("username")
                if (Cookie.getCookie("token")) {    
                    FetchData.borrowbook(this.borrowData,this.token)
                    .then(res => {
                        //console.log(res); 
                        if(res.status == 200) {
                            this.borrowShow = false;
                            this.borrowsuccess = true;
                        }
                        else if(res.status == 403) {
                            this.borrowShow = false;
                            this.beyond = true;
                        }
                        else if(res.status == 401 || res.status == 500) {
                            this.borrowShow = false;
                            this.authwrong = true;
                        }
                    })
                }
                else {
                    window.location.href = './login'
                }
                
            }
        },
    }
</script>

<style lang="scss">



.bookinfo{
    position: relative;
    top: 33px;
    margin: 0 30px  30px;
    line-height: 40px;
}
.reader-sign{
    position: relative;
    top: 33px;
    margin: 0 30px  30px;
}
.reader-sign-input{
    width: 120px;
    border-bottom: #686868 1px solid;
}
$Addsuccesslogow:90px;
.borrow-success-logo{
    position: absolute;
    width: $Addsuccesslogow;
    height: $Addsuccesslogow;
    top: 50%;
    left: 50%;
    margin-left: - $Addsuccesslogow/2;
    margin-top: - $Addsuccesslogow*4/5;
}
.borrow-success-info{
    position: absolute;
    width: $Addsuccesslogow;
    top: 70%;
    left: 50%;
    margin-left: - $Addsuccesslogow/2;
}
</style>
