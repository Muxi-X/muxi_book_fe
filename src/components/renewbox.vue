<template>
    <div>
        <v-bgshadow
        v-on:ending="ending"></v-bgshadow>
        <div class="box">
            <div class="box-close"
            @click="ending"></div>
            <div v-if="returning">
                <div class="box-title">续借书籍</div>
                <div class="bookinfo">
                    <div class="bookkind">{{bookitem.no}}</div>
                    <div class="bookname">{{bookitem.bookname}}</div>
                </div>
                <div class="reader-submit-bt cp afirm main-style"
                    @click="renewBook">
                        确认
                </div>
                <div class="reader-submit-bt cp cancel main-style"
                    @click="ending">
                        取消
                </div>
            </div>
            <div class="return-success" v-if="renewSuccess">
                <img src="../pictures/icon/selected.png" class="return-success-logo">
                <div class="return-success-info">续借成功!</div>
            </div>
            <div class="return-success" v-if="renewFalse">
                <img src="../pictures/icon/cancel.png" class="return-success-logo">
                <div class="return-success-info">未到续借日期!</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Bgshadow from './bgshadow.vue';
    import FetchData from '../service/mybook.js';
    export default {
        data() {
            return {
                returning: true,
                renewSuccess: false,
                renewFalse: false
            };
        },
        props:['myData','bookitem','token'],
        components: {
            'v-bgshadow': Bgshadow
        },
        methods: {
            ending:function(){
                this.returning = true;
                this.$emit("ending");
            },
            renewBook: function() {
                FetchData.renewBook(this.myData,this.token)
                .then(res => {
                    //console.log(res)
                    if(res.ok){
                        this.returnSuccess = true;
                        this.returning = false;
                    }else{
                        //console.log(false)
                        this.renewFalse = true;
                        this.returning = false
                    }
                })
            },
            
        },
    }
</script>

<style lang="scss">
.bookinfo{
    position: relative;
    top: 50px;
    margin: 0 30px  30px;
    line-height: 40px;
}
.afirm{
    position: absolute;
    top: 220px;
    left: 25%;
}
.cancel{
    position: absolute;
    top: 220px;
    left: 75%;
}
$Returnsuccesslogow:120px;
.return-success-logo{
    position: absolute;
    width: $Returnsuccesslogow;
    height: $Returnsuccesslogow;
    top: 50%;
    left: 50%;
    margin-left: - $Returnsuccesslogow/2;
    margin-top: - $Returnsuccesslogow*4/5;
}
.return-success-info{
    position: absolute;
    width: $Returnsuccesslogow;
    top: 70%;
    left: 50%;
    margin-left: - $Returnsuccesslogow/2;
}
</style>
