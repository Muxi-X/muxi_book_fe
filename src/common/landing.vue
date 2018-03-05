<template>
    <div class="login" id="landing">
        登录中.......
    </div>
</template>

<script>
import Cookie from '../service/cookie.js'
import API from '../service/login.js';
export default {
    data() {
        return {
            url: "",
            login: false,
			username: "",
			token: ""
        }
    },
    mounted() {
		this.username = window.location.href.split('?')[1].split('&')[0].split('=')[1]
		this.username = decodeURIComponent(this.username)//中文格式
		// console.log(this.username);
        Cookie.setCookie('username',this.username);
        Cookie.setCookie('Mt', window.location.href.split('?')[1].split('&')[1].split('=')[1])
		
        let bodyin = {
            username: this.username
        }
                
     
        API.login(bodyin)
        .then(res => {
         if(res!==null&&res!==undefined){
			// console.log("登录成功")
            return res.json();
		} 
       })
        .then(res => {
			// console.log(res);
			Cookie.setCookie("token", res.token);
			this.token = Cookie.getCookie("token");
            //Cookie.setCookie("uid", value.user_id)
            // Cookie.setCookie('avatar',value.avatar)
        })
        this.url = Cookie.getCookie("url")
        this.url = '/'
        setTimeout(() => {
            window.location = this.url;
        }, 1000)
    },
}
</script>