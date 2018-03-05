<template>
    <div>
        <v-header
        :authorized="authorized"></v-header>
        <div class="body">
            <v-item v-for="bookitem in Testbook"
            v-if="bookitem != null"
            :key="bookitem"
            :bookitem="bookitem"
            :authorized="authorized"
            @beginborrow="beginborrow"
            ></v-item>
            <div class="adjust-page" v-if="hasbook">
                <span class="adjust-page-icon cp arrowl"
                @click="pre()"></span>
                <span class="page-num">{{page}}</span>  
                <span class="adjust-page-icon cp arrowr"
                @click="next()"></span>
            </div>
            <div class="no-result" v-if="!hasbook">
                <img src="../pictures/icon/no-result.png" alt="">
                <div class="no-result-info">没有找到搜索结果</div>
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
    import Header from '../components/searchHeader.vue';
    import Item from '../components/item.vue';
    import Bgshadow from '../components/bgshadow.vue';
    import Borrowbox from '../components/borrowbox.vue';
    import FetchData from '../service/app.js';
    import FetchBook from '../service/mybook.js';
    import Cookie from '../service/cookie.js';
    import Search from '../service/search.js';
    export default {
        data() {
            return {
                searchData: {
                    partten: "",
                },
                page: 1,
                hasbook:true,
                Testbook:Array,//fetch得到的图书数组
                borrowing: false,//是否正在借阅图书
                borrowingbook: Object,//选择要添加的图书对象
                // adding: false,//是否正在添加图书
                // kind:1,//当前种类
                totalPage:1,//某种类型总页数
                haslogin:false,//是否登录过
                token: "",
                username: "",
                authorized: true
            };
        },
        components: {
           'v-header': Header,
           'v-item': Item,
           'v-bgshadow': Bgshadow,
           'v-borrowbox': Borrowbox
        },
        methods: {
            beginborrow: function(item){
                this.borrowingbook = item;
                this.borrowing = true;
            },
            ending: function(){
                this.borrowing = false;
                this.adding = false;
                this.searchBook(this.searchData);
            },
            searchBook: function(searchData,page){
                Search.searchbook(searchData,page)
                .then(res => {
                    if(res.status == 401) {
                        this.hasbook = false
                    }
                    if(res.status == 200) {
                        this.hasbook = true
                    }
                    return res.json()
                }).then(json => {
                    //console.log(json.books)
                    this.Testbook = json.books
                    this.totalPage = json.num % 10? Math.floor(json.num/10)+1 : json.num/10;
                    console.log(this.totalPage);
                })
            },
            pre: function(){
                if(this.page > 1) {
                    this.searchBook(this.searchData,--this.page)
                }
            },
            next: function(){
                if(this.page < this.totalPage) {
                    this.searchBook(this.searchData,++this.page)
                }
            }
        },
        mounted() {
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
            this.searchData.partten = decodeURIComponent(window.location.href.split('=')[1])
            this.searchBook(this.searchData,this.page);
        }
    }
</script>

<style lang="scss">

.body{
    background-color: #ffffff;
    height: 500px;
    padding-top: 4vw;
    font-family: "Adobe 黑体 Std";
    width: 100%;
}
.no-result{
    text-align: center;
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
