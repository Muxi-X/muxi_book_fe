<template>
    <div>
        <v-header
        :authorized="authorized"></v-header>
        <v-navbar v-on:getkind="getkind"></v-navbar>
        <!-- 获取种类 -->
        <div class="body">
            <v-item v-for="bookitem in Testbook"
            v-if="bookitem != null"
            :key="bookitem"
            :bookitem="bookitem"
            :authorized="authorized"
            @beginborrow="beginborrow"
            ></v-item>
            <v-addbook
            v-on:beginaddbook="beginaddbook"
            :authorized="authorized"></v-addbook>
            <div class="adjust-page">
                <span class="adjust-page-icon cp arrowl"
                @click="pre()"></span>
                <span class="page-num">{{page}}</span>  
                <span class="adjust-page-icon cp arrowr"
                @click="next()"></span>
            </div>
        </div>
        
        <transition name="component-fade" mode="out-in">
            <v-borrowbox v-if="borrowing"
            :borrowingbook="borrowingbook"
            v-on:ending="ending"
            ></v-borrowbox>
            <v-addbox v-if="adding"
            v-on:ending="ending"></v-addbox>
        </transition>
             
    </div>
</template>

<script>
    import Header from '../components/header.vue';
    import Navbar from '../components/navbar.vue';
    import Item from '../components/item.vue';
    import Bgshadow from '../components/bgshadow.vue';
    import Borrowbox from '../components/borrowbox.vue';
    import Addbook from '../components/addbook.vue';
    import Addbox from '../components/addbox.vue';
    import FetchData from '../service/app.js';
    import FetchBook from '../service/mybook.js';
    import Cookie from '../service/cookie.js';
    export default {
        data() {
            return {
                Testbook:Array,//fetch得到的图书数组
                borrowing: false,//是否挣扎借阅图书
                borrowingbook: Object,//选择要添加的图书对象
                adding: false,//是否正在添加图书
                page: 1,//当前页数
                kind:1,//当前种类
                totalPage:1,//某种类型总页数
                haslogin:false,//是否登录过
                token: "",
                username: "",
                authorized: true
            };
        },
        components: {
           'v-header': Header,
           'v-navbar': Navbar,
           'v-item': Item,
           'v-bgshadow': Bgshadow,
           'v-borrowbox': Borrowbox,
           'v-addbook': Addbook,
           'v-addbox': Addbox,
        },
        methods: {
            //通过传来的id（书种类）和page（当前页数）获取图书
            fetchbook:function(id,page){
                FetchData.getkind(id, page)
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    this.Testbook = json.books;//获取图书信息
                    this.totalPage = json.num % 9? Math.floor(json.num/9)+1 : json.num/9;
                    console.log("totalpage="+this.totalPage+" nums="+json.num);
                })
                
            },
            getkind: function(id){
                this.fetchbook(id,1)
                this.kind = id;
                this.page = 1;
            },
            beginborrow: function(item){
                this.borrowingbook = item;
                this.borrowing = true;
            },
            ending: function(){
                this.borrowing = false;
                this.adding = false;
                this.fetchbook(this.kind,this.page);

            },
            beginaddbook: function(){
                this.adding = true;
            },
            pre: function(){
                if(this.page - 1 > 0) {
                    this.fetchbook(this.kind,--this.page)
                }
            },
            next: function(){
                if(this.page < this.totalPage) {
                    this.fetchbook(this.kind,++this.page)
                }
            }
        },
        mounted() {
            this.getkind(1)
            this.token = Cookie.getCookie("token");
            this.username = Cookie.getCookie("username");
            FetchBook.getMyBook({
                username: this.username
            },this.token)
            .then(res => {
                if(res.status == 200) {
                    this.authorized = true
                }
                else{
                    this.authorized = false
                }
            })
        }
    }
</script>

<style lang="scss">

.body{
    background-color: #ffffff;
    height: 500px;
    padding-top: 4vw;
    font-family: "Adobe 黑体 Std";
}
.adjust-page{
    font-size: 32px;
    position: absolute;
    height: 50px;
    width: 300px;
    left: 50%;
    text-align: center;
    margin-left: -150px;
    margin-bottom: 20px;
    line-height: 50px;
}
.adjust-page-icon{
    display: inline-block;
    position: relative;
    top: 25%;
    margin: 0 20px 0 20px ;
}
.page-num{
    vertical-align: middle;
}
</style>
