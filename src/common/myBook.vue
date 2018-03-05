<template>
    <div>
        <v-myheader
        :username="myData.username"
        ></v-myheader>
        <v-myitem v-for="bookitem in Testbook"
            v-if="bookitem != null"
            :key="bookitem"
            :bookitem="bookitem"
            :username="myData.username" 
            @returnBook="returnBook"
            @renewBook="renewBook"
        ></v-myitem>
        <div v-if="hasnobook" class="hasnobook">你还没有借任何书哟！→_→</div>
        <transition name="component-fade" mode="out-in">
            <v-returnbox v-if="clickReturn"
            :myData="myData"
            :bookitem="bookitem"
            :token="token"
            @ending="ending"></v-returnbox>
            <v-renewbox v-if="clickRenew"
            :myData="myData"
            :bookitem="bookitem"
            :token="token"
            @ending="ending">
            </v-renewbox>
            <v-loginbox v-if="!authorized"
            @ending="ending"></v-loginbox>
        </transition>
    </div>  
</template>
<script>
    import Header from '../components/myheader.vue';
    import Myitem from '../components/myitem.vue';
    import Item from '../components/item.vue';
    import Returnbook from '../components/returnbox.vue';
    import Renewbook from '../components/renewbox.vue';
    import Loginbox from '../components/loginBox.vue';
    import FetchData from '../service/mybook.js';
    import Cookie from '../service/cookie.js';
    export default {
        data() {
            return {
                myData: {
                    username: ""
                },
                Testbook: [],
                bookitem: Object,
                clickReturn: false,//判断是否点击返回图书
                clickRenew: false,//判断是否点击续借图书
                authorized: true,//判断身份是否通过
                hasnobook: true,
                token: ""
            };
        },
        mounted() {
            this.token = Cookie.getCookie("token");
            this.myData.username = Cookie.getCookie("username");
            if (Cookie.getCookie("token")) {
                this.fetchMyBook();
            }
            else {
                this.authorized = false;
            }
        },
        components: {
           'v-myheader': Header,
           'v-myitem': Myitem,
           'v-returnbox': Returnbook,
           'v-renewbox': Renewbook,
           'v-loginbox': Loginbox,
        },
        methods: {
            fetchMyBook: function(){
                FetchData.getMyBook(this.myData,this.token)
                .then(res => {
                    
                    if(res.status == 401) {
                        this.authorized = false
                    }//省份验证失败
                    if(res.status == 200) {
                        this.authorized = true
                    }
                    return res.json()
                })
                .then(json => {
                    if(json.lend.length) {
                        this.hasnobook = false;
                    }
                    this.Testbook = json.lend;
                    // console.log("test"+json.lend.length);
                })
            },
            returnBook: function(item) {
                this.bookitem = item
                this.myData.no = item.no;
                this.clickReturn = true;
            },
            renewBook: function(item) {
                // console.log("mybook");
                this.bookitem = item
                this.myData.no = item.no
                // this.clickReturn = false;
                this.clickRenew = true
                //console.log("renturn,"+this.clickReturn)
                //console.log("renew,"+this.clickRenew)
            },
            ending: function(){
                this.clickReturn = false;
                this.clickRenew = false;
                this.authorized = true;
                this.fetchMyBook();
            }
        }
}
</script>

<style lang="scss">
.hasnobook{
    text-align: center;
    margin-top: 10%;
}
</style>

