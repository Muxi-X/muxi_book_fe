import Vue from 'vue'
import search from './common/search.vue'
import style from './main.scss'

new Vue({
    el: "#search",
    render: h => h(search)
})