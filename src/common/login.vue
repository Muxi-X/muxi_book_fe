<template>
    <div class="sign">
        <button class="signup_box full_width full_height">
	        <div v-on:click="login" class="signup full_width full_height">登录 / 注册</div>
	    </button>
	</div>
</template>
<script>
import Cookie from '../service/cookie.js'
import Login from '../service/login.js';
export default {
	methods: {
		login() {
			Login.toLoginPage();
		}
	}
}
</script>

<style lang="scss">
.sign {
    height: 30px;
    width: 100px;
    color: #959595;
    background: #dcdcdc;
    margin: 0 -2px;
    font-size: 14px;
    position: fixed;
    right: 0;
	top: 0;
}
.signup {
	line-height: 25px;
}
.signup_box,.sign {
	border-radius: 4px;
}
.signup_box:hover {
	background-color: #ffc162;
	cursor: pointer;
	.signup { 
		color: #ffffff;
	}
}
</style>

