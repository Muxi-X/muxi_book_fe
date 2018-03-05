<template>
    <div>
        <v-bgshadow
        v-on:ending="ending"></v-bgshadow>
        <div class="box">
            <div class="box-close"
            @click="ending"></div>
            <div v-if="adding">
                <div class="add-title">添加书籍</div>
                <div class="reader-sign">
                    <span>书籍编号：</span>
                    <input type="text" class="reader-sign-input" 
                    v-model="addData.no">
                </div>
                <div class="reader-sign">
                    <span>书籍名称：</span>
                    <input type="text" class="reader-sign-input"
                    v-model="addData.book">
                </div>
                <div class="reader-sign">
                    <span>选择组别：</span>
                    <select v-model="addData.kind">
                        <option disabled value="0">请选择组别</option>
                        <option v-for="(bookKind,index) in bookKinds"
                        :key="index"
                        :value="bookKind.kind" >{{bookKind.name}}</option>
                    </select>
                </div>
                <div class="reader-submit-bt cp addbox-bt"
                @click="addbook">
                    添加
                </div>
            </div>
            <div class="add-success" v-if="addSuccess">
                <img src="../pictures/icon/selected.png" class="add-success-logo">
                <div class="add-success-info">添加成功</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Bgshadow from './bgshadow.vue';
    import FetchData from '../service/app.js';
    export default {
        data() {
            return {
                bookKinds:[
                    {
                        name:'产品',
                        kind:1
                    },
                    {
                        name:'安卓',
                        kind:2
                    },
                    {
                        name:'前端',
                        kind:3
                    },
                    {
                        name:'后端',
                        kind:4
                    },
                    {
                        name:'设计',
                        kind:5
                    },
                    {
                        name:'其他',
                        kind:6
                    }
                ],
                addData: {
                    kind: Intl,//种类
                    book: '',//书名
                    no: ''//编号
                },
                adding: true,//正在添加的flag
                addSuccess: false,//添加成功的flag
                addFalse: false,//添加失败的flag
            };
        },
        props:['borrowingbook'],//从item传进的图书对象
        components: {
            'v-bgshadow': Bgshadow
        },
        methods: { 
            addbook: function(){
                FetchData.addbook(this.addData)
                .then(res => {
                    //console.log(res)
                    if(res.ok){
                        this.adding = false;
                        this.addSuccess = true;
                    }//添加成功
                    else if(res.status == 400){
                        alert("重复添加！");
                        this.adding = false;
                    }//添加失败
                    else {
                        alert("重复添加！");
                        this.adding = false;
                    }
                })
            },
            addSuccess: function(){
                this.adding = false;
                this.addSuccess = true;
            },
            ending:function(){
                this.adding = true;
                this.addSuccess = false;
                this.addFalse = false;
                this.$emit("ending")
            }//结束添加
        },
    }
</script>

<style lang="scss">


.add-title{
    position: relative;
    text-align: center;
    top: 30px;
    margin-bottom: 15px;
    display: block;
}
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
// 选择框
select{
    border: 1px solid #777777;
    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    border-radius: 0;
    width: 120px;
    height: 30px;
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
}
$Addsuccesslogow:90px;
.add-success-logo{
    position: absolute;
    width: $Addsuccesslogow;
    height: $Addsuccesslogow;
    top: 50%;
    left: 50%;
    margin-left: - $Addsuccesslogow/2;
    margin-top: - $Addsuccesslogow*4/5;
}
.add-success-info{
    position: absolute;
    width: $Addsuccesslogow;
    top: 70%;
    left: 50%;
    margin-left: - $Addsuccesslogow/2;
}
</style>
